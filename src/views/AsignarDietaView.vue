<template>
  <div class="container">
    <header class="header">
      <navBarAdministrador />
    </header>
    <section>
      <div>
        <h1 v-if="usuario">Rutina para {{ usuario.nombre }}</h1>
        <h1 v-if="usuario">Con id {{ usuario.id }}</h1>
        <h1 v-else>No se selecciono ningun usuario</h1>
        <h2>Ingresa la Fecha</h2>
        <vue3-datepicker v-model="fechaSeleccionada" :typeable="true" />
      </div>
    </section>

    <div class="sections-container">
      <section class="section-left">
        <div>
          <form @submit.prevent="agregarDieta">
            <div>
              <label for="tipoComida">Tipo de Comida:</label>
              <select v-model="tipoComida" id="tipoComida">
                <option value="Desayuno">Desayuno</option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
              </select>
            </div>
            <div class="button">
              <router-link to="/clientes">
                <button class="buttons__btn1">Regresar</button>
              </router-link>
              <button type="submit">Agregar Dieta</button>
            </div>
          </form>
          <div>
            <h1 id="titulo">Alimentos</h1>
            <div class="seleccionado-info">
              <p>Alimentos seleccionados:</p>
              <ul>
                <li v-for="alimento in alimentosSeleccionados" :key="alimento.nombre">
                  {{ alimento.nombre }} ({{ alimento.categoria }})
                </li>
              </ul>
            </div>
            <div>
              <select v-model="filtroCategorias" @change="filtrarAlimentos">
                <option value="">Filtrar por categorias</option>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>
            </div>
            <div v-if="filtroCategorias">
              <div class="busqueda">
                <div class="input-container">
                  <input class="buscar" type="text" v-model="busqueda" placeholder="Buscar alimento..."
                    @input="buscarAlimento" />
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
          <table class="tabla_alimentos" v-if="filtroCategorias">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>energia</th>
                <th>Proteinas</th>
                <th>Grasas</th>
                <th>Hidratos de Carbono</th>
                <th>Porciones</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(alimento, index) in alimentosFiltrados" :key="index" :class="{
                'fila-par': index % 2 === 0,
                'fila-impar': index % 2 !== 0,
              }">
                <td>{{ alimento.nombre }}</td>
                <td>{{ alimento.categoria }}</td>
                <td>{{ alimento.energia }}</td>
                <td>{{ alimento.proteinas }}</td>
                <td>{{ alimento.grasas }}</td>
                <td>{{ alimento.hidratosDeCarbono }}</td>
                <input type="text" v-model="alimento.porciones" />
                <td>
                  <button @click="seleccionarAlimento(alimento)">
                    {{ alimentosSeleccionados.find(e => e.nombre === alimento.nombre) ? 'Quitar' : 'Agregar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="section-right">
        <h1 id="titulo"> Dieta </h1>
        <div v-for="(alimentos, tipo) in dietaPorTipo" :key="tipo">
          <h2>{{ tipo }}</h2> <!-- Esto muestra el nombre del tipo, podrías cambiarlo a lo que necesites -->
          <table class="tabla_alimentos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>energia</th>
                <th>Proteinas</th>
                <th>Grasas</th>
                <th>Hidratos de Carbono</th>
                <th>Porciones</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alimento in alimentos" :key="alimento.nombre">
                <td>{{ alimento.nombre }}</td>
                <td>{{ alimento.categoria }}</td>
                <td>{{ alimento.energia }}</td>
                <td>{{ alimento.proteinas }}</td>
                <td>{{ alimento.grasas }}</td>
                <td>{{ alimento.hidratosDeCarbono }}</td>
                <td>{{ alimento.porciones }}</td>
                <td>
                  <button @click="eliminarAlimento(alimento, tipo)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import navBarAdministrador from "@/components/navBarAdministrador.vue";
import { collection, getDocs } from "firebase/firestore";
import { useUserStore } from "../stores/user";
import { db } from "../Firebase/index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Vue3Datepicker from "vue3-datepicker";

export default {
  data() {
    return {
      busqueda: "",
      filtroCategorias: "",
      isLocalAdmin: false,
      selectedUserId: null,
      alimentosSeleccionados: [],
      usuario: null,
      alimentos: [],
      categorias: [],
      fechaSeleccionada: null,
      dieta: {},
      tipoComida: "",
    };
  },
  components: {
    navBarAdministrador,
    Vue3Datepicker,
  },
  computed: {
    alimentosFiltrados() {
      let alimentosFiltrados = this.alimentos;
      if (this.filtroCategorias) {
        alimentosFiltrados = alimentosFiltrados.filter(alimento => alimento.categoria === this.filtroCategorias);
      }
      if (this.busqueda.length > 0) {
        const busquedaMinuscula = this.busqueda.toLowerCase();
        alimentosFiltrados = alimentosFiltrados.filter(alimento =>
          alimento.nombre.toLowerCase().includes(busquedaMinuscula) ||
          alimento.categoria.toLowerCase().includes(busquedaMinuscula)
        );
      }
      return alimentosFiltrados;
    },
    dietaPorTipo() {
      const dietaPorTipo = {
        Desayuno: [],
        Comida: [],
        Cena: [],
      };

      for (const tipoComida in this.dieta) {
        if (dietaPorTipo[tipoComida]) {
          dietaPorTipo[tipoComida] = this.dieta[tipoComida];
        }
      }

      return dietaPorTipo;
    },
  },
  methods: {
    async eliminarAlimento(alimento, tipoComida) {
      const fechaFormateada = this.fechaSeleccionada.toLocaleDateString("es-ES");
      const docRef = doc(db, "dietas", this.selectedUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dietas = docSnap.data();
        if (dietas[fechaFormateada] && dietas[fechaFormateada][tipoComida]) {
          delete dietas[fechaFormateada][tipoComida][alimento.nombre];
          await setDoc(docRef, dietas);
          this.dieta = Object.keys(dietas[fechaFormateada]).reduce((acc, key) => {
            acc[key] = Object.values(dietas[fechaFormateada][key]);
            return acc;
          }, {});
          console.log("Alimento eliminado de la dieta correctamente.");
        } else {
          console.error("No se encontró la dieta para la fecha y tipo de comida seleccionados.");
        }
      } else {
        console.error("Error al recuperar la dieta del usuario:", this.selectedUserId);
      }
    },

    async mostrarDieta() {
      if (!this.fechaSeleccionada) {
        return;
      }

      const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
      const docRef = doc(db, 'dietas', this.selectedUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dietas = docSnap.data();
        if (dietas[fechaFormateada]) {
          this.dieta = Object.keys(dietas[fechaFormateada]).reduce((acc, key) => {
            acc[key] = Object.values(dietas[fechaFormateada][key]);
            return acc;
          }, {});
        } else {
          this.dieta = {};
        }
      } else {
        console.error('Error al recuperar la dieta del usuario:', this.selectedUserId);
      }
    },

    async agregarDieta() {
      try {
        const docRef = doc(db, "dietas", this.selectedUserId);
        const docSnap = await getDoc(docRef);
        let dietas = {};

        if (docSnap.exists()) {
          dietas = docSnap.data() || {};
        }

        const fechaFormateada = this.fechaSeleccionada.toLocaleDateString("es-ES");
        const alimentosDieta = {};

        this.alimentosSeleccionados.forEach((alimento) => {
          alimentosDieta[alimento.nombre] = {
            ...alimento,
            tipoComida: this.tipoComida,
            porciones: alimento.porciones,
            alimentoCompletado: false,
          };
        });

        if (!dietas[fechaFormateada]) {
          dietas[fechaFormateada] = {};
        }

        dietas[fechaFormateada][this.tipoComida] = alimentosDieta;

        await setDoc(docRef, dietas, { merge: true });

        this.fechaSeleccionada = null;
        this.alimentosSeleccionados = [];

        console.log("Fecha agregada a la dieta correctamente.");
      } catch (error) {
        console.error("Error al agregar la fecha:", error);
      }
    },

    seleccionarAlimento(alimento) {
      const index = this.alimentosSeleccionados.findIndex(e => e.nombre === alimento.nombre);
      if (index !== -1) {
        this.alimentosSeleccionados.splice(index, 1);
      } else {
        alimento.tipoComida = this.tipoComida;
        this.alimentosSeleccionados.push(alimento);
      }
    },

    async alimentosCargado() {
      try {
        const querySnapshot = await getDocs(collection(db, "alimentos"));
        this.alimentos = [];
        this.categorias = [];
        querySnapshot.forEach((doc) => {
          const alimento = doc.data();
          this.alimentos.push(alimento);
          if (!this.categorias.includes(alimento.categoria)) {
            this.categorias.push(alimento.categoria);
          }
        });
        this.alimentos.sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log("Alimentos cargados:", this.alimentos);
        console.log("Categorias de alimento:", this.categorias);
      } catch (error) {
        console.error("Error al cargar los alimentos:", error);
      }
    },
    async usuarioCargado() {
      try {
        console.log(`Se selecciono al usuario: ${this.selectedUserId}`);
        const docRef = doc(db, "usuarios", this.selectedUserId);
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
  },

  beforeRouteEnter(to, from, next) {
    console.clear();
    const userStore = useUserStore();
    const selectedUserId = userStore.selectedUserId;
    const isLocalAdmin = userStore.isAdmin;
    console.log(`isAdmin dentro del before es: ${userStore.isAdmin}`);
    next((vm) => {
      vm.selectedUserId = selectedUserId;
      vm.isLocalAdmin = isLocalAdmin;
    });
  },

  mounted() {
    this.alimentosCargado();
    this.usuarioCargado();
  },

  watch: {
    fechaSeleccionada() {
      this.mostrarDieta();
    }
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sections-container {
  display: flex;
  flex: 1;
}

.section-left,
.section-right {
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
}

.section-left {
  border-right: 1px solid #ccc;
}

@media (max-width: 768px) {
  .sections-container {
    flex-direction: column;
  }

  .section-left,
  .section-right {
    width: 100%;
    border-right: none;
  }
}

.seleccionado-info {
  font-weight: bold;
  font-size: 1.5em;
  background: linear-gradient(to right, rgb(221, 94, 137), rgb(247, 187, 151));
  text-decoration-line: underline;
  box-shadow: 0 15px 25px 5px rgb(221, 94, 137);
  margin-block-start: 20px;
  margin-block-end: 20px;
}

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
  /* Color azul para filas impares */
  color: white;
}

.tabla_alimentos tr:nth-child(even) {
  background-color: #cceeff;
  /* Color azul más suave para filas pares */
}

/*.tabla_alimentos tr:hover {
  background-color: #f9f9f9;
}*/

.section-right {
  margin-top: 90px;
}
</style>
