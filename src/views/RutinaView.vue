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
          <tbody v-if="rutina">
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
                  required>
              </td>
            </tr>
          </tbody>
        </table>


        <button type="submit" :disabled="!todosEjerciciosRealizados">Rutina Realizada</button>

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
import { db, auth } from "../Firebase/index"; // Asegúrate de importar auth de Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      ejercicios: [],
      isLocalAdmin: false,
      currentUserUID: null,
      fechaSeleccionada: null, // Añade una nueva propiedad para almacenar la fecha seleccionada
      rutina: [], // Inicializar rutina como un array vacío
      ejerciciosRealizados: {},
      rutinaRealizada: false,
      usuario: null,
    };
  },
  computed: {
    todosEjerciciosRealizados() {
      return Object.values(this.ejerciciosRealizados).every(value => value);
    }
  },

  components: {
    navBarUsuario,
    Vue3Datepicker,
  },
  methods: {
    async actualizarRanking() {
  try {
    // Obtener la referencia al documento de la colección "Ranking" para el usuario actual
    const docRef = doc(db, 'Ranking', this.currentUserUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Obtener el puntaje actual del documento
      const data = docSnap.data();
      const puntajeActual = data.puntaje || 0;

      // Sumar 10 al puntaje actual
      const nuevoPuntaje = puntajeActual + 10;

      // Actualizar el documento con el nuevo puntaje
      await setDoc(docRef, {
        nombre: this.usuario.nombre,
        puntaje: nuevoPuntaje,
        id: this.currentUserUID,
      });

      console.log('Puntaje actualizado correctamente');
    } else {
      console.log('No se encontró un documento de ranking para el usuario actual. Creando uno nuevo...');

      // Crear un nuevo documento en la colección "Ranking" para el usuario actual
      await setDoc(docRef, {
        nombre: this.usuario.nombre,
        puntaje: 10, // Empezar con un puntaje de 10
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
          usuario.id = docSnap.id; // Agrega el ID del documento al objeto usuario
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
      // Actualizar ejerciciosRealizados a true para cada ejercicio
      this.rutina.forEach(ejercicio => {
        this.ejerciciosRealizados[ejercicio.nombre] = true;
      });

      // Obtener la referencia al documento de la rutina del usuario para la fecha seleccionada
      const docRef = doc(db, 'rutinas', this.currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rutinas = docSnap.data();
        const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
        if (rutinas[fechaFormateada]) {
          // Actualizar los ejercicios realizados en la rutina para la fecha seleccionada
          Object.keys(rutinas[fechaFormateada]).forEach(ejercicio => {
            rutinas[fechaFormateada][ejercicio].ejercicioRealizado = this.ejerciciosRealizados[ejercicio] || false;
          });

          // Actualizar el documento en Firestore
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
        return; // No mostrar nada si no hay fecha seleccionada
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
          // Validar si todos los ejercicios están marcados como realizados
          this.rutinaRealizada = this.rutina.every(ejercicio => ejercicio.ejercicioRealizado);
        } else {
          this.rutina = []; // No hay rutina para la fecha seleccionada
        }
      } else {
        console.error('Error al recuperar la rutina del usuario:', this.currentUserUID);
      }
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
    // Escuchar cambios en la autenticación
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
      this.mostrarRutina(); // Mostrar rutina al cambiar la fecha seleccionada
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
  /* Color azul para filas impares */
  color: white;
}

.tabla_ejercicios tr:nth-child(even) {
  background-color: #cceeff;
  /* Color azul más suave para filas pares */
}
</style>