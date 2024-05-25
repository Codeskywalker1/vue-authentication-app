<template>
  <div class="container">
    <header class="header">
      <navBarUsuario />
    </header>
  </div>
  <section>
    <div>
      <h2>Ingresa la Fecha</h2>
      <vue3-datepicker v-model="fechaSeleccionada" :typeable="true" />
    </div>
    <div v-if="rutinaRealizada === false">
      <h1 id="titulo"> Rutina </h1>
      <form @submit.prevent="handleSubmit">
        <table class="tabla_ejercicios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo Muscular</th>
              <th>Ejemplo</th>
              <th>Series</th>
              <th>Repeticiones</th>
              <th>Descanso</th>
              <th>Realizado</th>
            </tr>
          </thead>
          <tbody v-if="rutina.length">
            <tr v-for="ejercicio in rutina" :key="ejercicio.nombre">
              <td>{{ ejercicio.nombre }}</td>
              <td>{{ ejercicio.grupoMuscular }}</td>
              <td>
                <img :src="ejercicio.imagenURL" alt="Imagen del ejercicio"
                  style="max-width: 100px; max-height: 100px" />
              </td>
              <td>{{ ejercicio.series }}</td>
              <td>{{ ejercicio.repeticiones }}</td>
              <td>{{ ejercicio.descanso }}</td>
              <td>
                <input type="checkbox" :id="'ejercicioRealizado-' + ejercicio.nombre"
                  :name="'ejercicioRealizado-' + ejercicio.nombre" v-model="ejerciciosRealizados[ejercicio.nombre]"
                  @change="checkAllEjerciciosRealizados">
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" :disabled="!rutina.length || !todosEjerciciosRealizados">Rutina Realizada</button>

      </form>
    </div>
    <div v-else-if="rutinaRealizada === true">
      <p>Se realizó la rutina</p>
      <p>{{ rutinaRealizada }}</p>
    </div>
    <div v-else>
      <p>No hay rutina</p>
    </div>
  </section>
</template>

<script>
import navBarUsuario from "@/components/navBarUsuario.vue";
import Vue3Datepicker from "vue3-datepicker";
import { useUserStore } from "../stores/user";
import { db, auth } from "../Firebase/index";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      ejercicios: [],
      isLocalAdmin: false,
      currentUserUID: null,
      fechaSeleccionada: null,
      rutina: [],
      ejerciciosRealizados: {},
      rutinaRealizada: false,
      usuario: null,
    };
  },
  computed: {
    todosEjerciciosRealizados() {
      return this.rutina.length && Object.values(this.ejerciciosRealizados).every(value => value);
    }
  },
  components: {
    navBarUsuario,
    Vue3Datepicker,
  },
  methods: {
    async actualizarRanking() {
      try {
        const docRef = doc(db, 'Ranking', this.currentUserUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const puntajeActual = data.puntaje || 0;
          const nuevoPuntaje = puntajeActual + 10;

          await setDoc(docRef, {
            nombre: this.usuario.nombre,
            puntaje: nuevoPuntaje,
            id: this.currentUserUID,
          });

          console.log('Puntaje actualizado correctamente');
        } else {
          console.log('No se encontró un documento de ranking para el usuario actual. Creando uno nuevo...');

          await setDoc(docRef, {
            nombre: this.usuario.nombre,
            puntaje: 10,
            id: this.currentUserUID,
          });

          console.log('Documento de ranking creado correctamente');
        }
      } catch (error) {
        console.error('Error al actualizar el puntaje:', error);
      }
    },

    async usuarioCargado() {
      try {
        const docRef = doc(db, "usuarios", this.currentUserUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const usuario = docSnap.data();
          usuario.id = docSnap.id;
          this.usuario = usuario;
          console.log("Usuario cargado:", this.usuario);
        } else {
          console.log("No existe el usuario con el ID especificado");
        }
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    },
    async handleSubmit() {
      this.rutina.forEach(ejercicio => {
        this.ejerciciosRealizados[ejercicio.nombre] = true;
      });

      const docRef = doc(db, 'rutinas', this.currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rutinas = docSnap.data();
        const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
        if (rutinas[fechaFormateada]) {
          Object.keys(rutinas[fechaFormateada]).forEach(ejercicio => {
            rutinas[fechaFormateada][ejercicio].ejercicioRealizado = this.ejerciciosRealizados[ejercicio] || false;
          });

          await setDoc(docRef, rutinas);
          console.log('Rutina guardada con éxito');
        } else {
          console.error('No hay rutina para la fecha seleccionada');
        }
      } else {
        console.error('Error al recuperar la rutina del usuario:', this.currentUserUID);
      }
      await this.actualizarRanking();
      //window.location.reload();
    },

    async mostrarRutina() {
      if (!this.fechaSeleccionada) {
        return;
      }

      const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
      const docRef = doc(db, 'rutinas', this.currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rutinas = docSnap.data();
        if (rutinas[fechaFormateada]) {
          const rutinaDelDia = rutinas[fechaFormateada];
          this.rutina = Object.keys(rutinaDelDia).map(nombreEjercicio => {
            const ejercicio = rutinaDelDia[nombreEjercicio];
            return {
              nombre: nombreEjercicio,
              grupoMuscular: ejercicio.grupoMuscular,
              imagenURL: ejercicio.imagenURL,
              series: ejercicio.series,
              repeticiones: ejercicio.repeticiones,
              descanso: ejercicio.descanso,
              ejercicioRealizado: ejercicio.ejercicioRealizado,
            };
          });
          this.ejerciciosRealizados = this.rutina.reduce((acc, ejercicio) => {
            acc[ejercicio.nombre] = ejercicio.ejercicioRealizado || false;
            return acc;
          }, {});
          this.rutinaRealizada = this.rutina.every(ejercicio => ejercicio.ejercicioRealizado);
        } else {
          this.rutina = [];
          this.ejerciciosRealizados = {};
        }
      } else {
        console.error('Error al recuperar la rutina del usuario:', this.currentUserUID);
      }
    },
    checkAllEjerciciosRealizados() {
      this.$forceUpdate();
    },
  },

  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();
    const isLocalAdmin = userStore.isAdmin;
    console.log(`isAdmin dentro del before es: ${userStore.isAdmin}`);
    next((vm) => {
      vm.isLocalAdmin = isLocalAdmin;
    });
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUID = user.uid;
        console.log("El usuario actual es ", this.currentUserUID);
        this.usuarioCargado();
      }
    });
  },
  watch: {
    fechaSeleccionada() {
      this.mostrarRutina();
    }
  },
};

</script>

<style>
.tabla_ejercicios {
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla_ejercicios input {
  max-width: 7ch;
}

.tabla_ejercicios td,
.tabla_ejercicios th {
  max-width: 20ch;
  border: 1px solid #ddd;
  padding: 8px;
}

.tabla_ejercicios th {
  background-color: #030303;
}

.tabla_ejercicios tr:nth-child(odd) {
  background-color: #007bff;
  color: white;
}

.tabla_ejercicios tr:nth-child(even) {
  background-color: #cceeff;
}
</style>
