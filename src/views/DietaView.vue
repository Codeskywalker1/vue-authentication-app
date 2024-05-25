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
    <div v-if="dietaLograda === false">
      <h1 id="titulo"> Dieta </h1>
      <form @submit.prevent="handleSubmit">
        <div v-for="(alimentos, tipo) in dietaPorTipo" :key="tipo">
          <h2>{{ tipo }}</h2>
          <table class="tabla_alimentos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Ejemplo</th>
                <th>Energia</th>
                <th>Proteinas</th>
                <th>Grasas</th>
                <th>Hidratos de Carbono</th>
                <th>Porciones</th>
                <th>Completo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alimento in alimentos" :key="alimento.nombre">
                <td>{{ alimento.nombre }}</td>
                <td>{{ alimento.categoria }}</td>
                <td>
                  <img :src="alimento.imagenURL" alt="Imagen del alimento" style="max-width: 100px; max-height: 100px" />
                </td>
                <td>{{ alimento.energia }}</td>
                <td>{{ alimento.proteinas }}</td>
                <td>{{ alimento.grasas }}</td>
                <td>{{ alimento.hidratosDeCarbono }}</td>
                <td>{{ alimento.porciones }}</td>
                <td>
                  <input type="checkbox" :id="getCheckboxId(tipo, alimento.nombre)"
                    :name="getCheckboxName(tipo, alimento.nombre)"
                    v-model="alimentosCompletados[tipo][alimento.nombre]"
                    @change="checkAllAlimentosCompletados">
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" @click="handleSubmitPorTipo(tipo)">Actualizar {{ tipo }}</button>
        </div>

        <button type="submit" :disabled="!todosAlimentosRealizados || !hayDieta">Dieta Completa</button>

      </form>
    </div>
    <div v-else-if="dietaLograda === true">
      <p>Se realizó la dieta</p>
      <p>{{ dietaLograda }}</p>
    </div>
    <div v-else>
      <p>No hay dieta</p>
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
      alimentos: [],
      isLocalAdmin: false,
      currentUserUID: null,
      fechaSeleccionada: null,
      dietaPorTipo: {},
      alimentosCompletados: {},
      dietaLograda: false,
      usuario: null,
      hayDieta: false,
    };
  },
  computed: {
    todosAlimentosRealizados() {
      for (let tipo in this.dietaPorTipo) {
        for (let alimento of this.dietaPorTipo[tipo]) {
          if (!this.alimentosCompletados[tipo][alimento.nombre]) {
            return false;
          }
        }
      }
      return true;
    }
  },
  components: {
    navBarUsuario,
    Vue3Datepicker,
  },
  methods: {
    getCheckboxId(tipo, nombre) {
      return `alimentoCompletado-${tipo}-${nombre}`;
    },
    getCheckboxName(tipo, nombre) {
      return `alimentoCompletado-${tipo}`;
    },
    isAlimentoCompletado(tipo, nombre) {
      return this.alimentosCompletados[tipo] && this.alimentosCompletados[tipo][nombre];
    },
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
      const docRef = doc(db, 'dietas', this.currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dietas = docSnap.data();
        const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
        if (dietas[fechaFormateada]) {
          Object.keys(dietas[fechaFormateada]).forEach(tipo => {
            Object.keys(dietas[fechaFormateada][tipo]).forEach(alimento => {
              dietas[fechaFormateada][tipo][alimento].alimentoCompletado = this.alimentosCompletados[tipo][alimento] || false;
            });
          });

          await setDoc(docRef, dietas);
          console.log('Dieta guardada con éxito');
        } else {
          console.error('No hay dieta para la fecha seleccionada');
        }
      } else {
        console.error('Error al recuperar la dieta del usuario:', this.currentUserUID);
      }
      await this.actualizarRanking();
    },
    async handleSubmitPorTipo(tipo) {
      const docRef = doc(db, 'dietas', this.currentUserUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dietas = docSnap.data();
        const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
        if (dietas[fechaFormateada] && dietas[fechaFormateada][tipo]) {
          Object.keys(dietas[fechaFormateada][tipo]).forEach(alimento => {
            dietas[fechaFormateada][tipo][alimento].alimentoCompletado = this.alimentosCompletados[tipo][alimento] || false;
          });

          await setDoc(docRef, dietas);
          console.log(`Dieta de ${tipo} guardada con éxito`);
        } else {
          console.error(`No hay dieta de ${tipo} para la fecha seleccionada`);
        }
      } else {
        console.error('Error al recuperar la dieta del usuario:', this.currentUserUID);
      }
    },

    async mostrarDieta() {
  if (!this.fechaSeleccionada) {
    this.hayDieta = false;
    return;
  }

  const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
  const docRef = doc(db, 'dietas', this.currentUserUID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const dietas = docSnap.data();
    if (dietas[fechaFormateada]) {
      // Ordenar las claves (tipos de comida) en el orden deseado
      const tiposOrdenados = ['Desayuno', 'Comida', 'Cena'];
      this.dietaPorTipo = {};
      this.alimentosCompletados = {};

      // Iterar sobre los tipos de comida en el orden deseado
      tiposOrdenados.forEach(tipo => {
        if (dietas[fechaFormateada][tipo]) {
          this.dietaPorTipo[tipo] = Object.values(dietas[fechaFormateada][tipo]);
          this.alimentosCompletados[tipo] = this.dietaPorTipo[tipo].reduce((acc, alimento) => {
            acc[alimento.nombre] = alimento.alimentoCompletado || false;
            return acc;
          }, {});
        }
      });

      this.hayDieta = true;
      this.dietaLograda = Object.keys(this.alimentosCompletados).every(tipo =>
  Object.keys(this.alimentosCompletados[tipo]).every(alimento =>
    this.alimentosCompletados[tipo][alimento]
  )
);

    } else {
      this.dietaPorTipo = {};
      this.alimentosCompletados = {};
      this.hayDieta = false;
    }
  } else {
    console.error('Error al recuperar la dieta del usuario:', this.currentUserUID);
    this.hayDieta = false;
  }
},
    checkAllAlimentosCompletados() {
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
      this.mostrarDieta();
    }
  },
};
</script>

<style>
.tabla_alimentos {
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla_alimentos input {
  max-width: 7ch;
}

.tabla_alimentos td,
.tabla_alimentos th {
  max-width: 20ch;
  border: 1px solid #ddd;
  padding: 8px;
}

.tabla_alimentos th {
  background-color: #030303;
}

.tabla_alimentos tr:nth-child(odd) {
  background-color: #007bff;
  color: white;
}

.tabla_alimentos tr:nth-child(even) {
  background-color: #cceeff;
}
</style>
