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
          <form @submit.prevent="agregarRutina">
            <div class="button">
              <router-link to="/clientes">
                <button class="buttons__btn1">Regresar</button>
              </router-link>
              <button type="submit">Agregar Rutina</button>
            </div>
          </form>
          <div>
            <h1 id="titulo">Ejercicios</h1>
            <div class="seleccionado-info">
              <p>Ejercicios seleccionados:</p>
              <ul>
                <li v-for="ejercicio in ejerciciosSeleccionados" :key="ejercicio.nombre">
                  {{ ejercicio.nombre }} ({{ ejercicio.grupoMuscular }})
                </li>
              </ul>
            </div>
            <div>
              <select v-model="filtroGruposMusculares" @change="filtrarEjercicios">
                <option value="">Filtrar por grupo muscular</option>
                <option v-for="grupoMuscular in gruposMusculares" :key="grupoMuscular" :value="grupoMuscular">{{
                  grupoMuscular }}</option>
              </select>
            </div>
            <div v-if="filtroGruposMusculares">
              <div class="busqueda">
                <div class="input-container">
                  <input class="buscar" type="text" v-model="busqueda" placeholder="Buscar ejercicio..."
                    @input="buscarEjercicio" />
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
          <table class="tabla_ejercicios" v-if="filtroGruposMusculares">
            <div>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Grupo Muscular</th>
                  <th>Series</th>
                  <th>Repeticiones</th>
                  <th>Descanso</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ejercicio, index) in ejerciciosFiltrados" :key="index" :class="{
                  'fila-par': index % 2 === 0,
                  'fila-impar': index % 2 !== 0,
                }">
                  <td>{{ ejercicio.nombre }}</td>
                  <td>{{ ejercicio.grupoMuscular }}</td>

                  <td>
                    <input type="text" v-model="ejercicio.series" />
                  </td>
                  <td>
                    <input type="text" v-model="ejercicio.repeticiones" />
                  </td>
                  <td>
                    <input type="text" v-model="ejercicio.descanso" />
                  </td>
                  <td>
                    <button @click="seleccionarEjercicio(ejercicio)">
                      {{ ejerciciosSeleccionados.find(e => e.nombre === ejercicio.nombre) ? 'Quitar' : 'Agregar' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </div>
          </table>

        </div>
      </section>
      <!--
    Mostrar rutina
  -->
      <section class="section-right">
        <h1 id="titulo"> Rutina </h1>
        <table class="tabla_ejercicios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo Muscular</th>
              <th>Series</th>
              <th>Repeticiones</th>
              <th>Descanso</th>
            </tr>
          </thead>
          <tbody v-if="rutina">
            <tr v-for="ejercicio in rutina" :key="ejercicio.nombre">
              <td>{{ ejercicio.nombre }}</td>
              <td>{{ ejercicio.grupoMuscular }}</td>
              <td>{{ ejercicio.series }}</td>
              <td>{{ ejercicio.repeticiones }}</td>
              <td>{{ ejercicio.descanso }}</td>
              <td>
                <button @click="eliminarEjercicio(ejercicio)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

  </div>


</template>

<script>
import navBarAdministrador from "@/components/navBarAdministrador.vue";
import { collection, getDocs } from "firebase/firestore";
import { useUserStore } from "../stores/user";
import { db } from "../Firebase/index"; // Asegúrate de importar auth de Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import Vue3Datepicker from "vue3-datepicker";

export default {
  data() {
    return {
      busqueda: "",
      filtroGruposMusculares: "", // Valor inicial vacío
      isLocalAdmin: false,
      selectedUserId: null,
      ejerciciosSeleccionados: [],
      usuario: null,
      ejercicios: [],
      gruposMusculares: [],
      fechaSeleccionada: null, // Añade una nueva propiedad para almacenar la fecha seleccionada
      rutina: [], // Inicializar rutina como un array vacío
    };
  },
  components: {
    navBarAdministrador,
    Vue3Datepicker,
  },
  computed: {
    ejerciciosFiltrados() {
      let ejerciciosFiltrados = this.ejercicios;
      if (this.filtroGruposMusculares) {
        ejerciciosFiltrados = ejerciciosFiltrados.filter(ejercicio => ejercicio.grupoMuscular === this.filtroGruposMusculares);
      }
      if (this.busqueda.length > 0) {
        const busquedaMinuscula = this.busqueda.toLowerCase();
        ejerciciosFiltrados = ejerciciosFiltrados.filter(ejercicio =>
          ejercicio.nombre.toLowerCase().includes(busquedaMinuscula) ||
          ejercicio.grupoMuscular.toLowerCase().includes(busquedaMinuscula)
        );
      }
      return ejerciciosFiltrados;
    },
  },
  methods: {
    async eliminarEjercicio(ejercicio) {
      const fechaFormateada = this.fechaSeleccionada.toLocaleDateString("es-ES");
      const docRef = doc(db, "rutinas", this.selectedUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rutinas = docSnap.data();
        if (rutinas[fechaFormateada]) {
          delete rutinas[fechaFormateada][ejercicio.nombre]; // Elimina el ejercicio de la rutina
          await setDoc(docRef, rutinas); // Actualiza la rutina en la base de datos
          this.rutina = Object.keys(rutinas[fechaFormateada]).map(nombreEjercicio => {
            const ejercicio = rutinas[fechaFormateada][nombreEjercicio];
            return {
              nombre: nombreEjercicio,
              grupoMuscular: this.ejercicios.find(e => e.nombre === nombreEjercicio)?.grupoMuscular || '',
              series: ejercicio.series,
              repeticiones: ejercicio.repeticiones,
              descanso: ejercicio.descanso
            };
          });
          console.log("Ejercicio eliminado de la rutina correctamente.");
        } else {
          console.error("No se encontró la rutina para la fecha seleccionada.");
        }
      } else {
        console.error("Error al recuperar la rutina del usuario:", this.selectedUserId);
      }
    },

    async mostrarRutina() {
      if (!this.fechaSeleccionada) {
        return; // No mostrar nada si no hay fecha seleccionada
      }

      const fechaFormateada = this.fechaSeleccionada.toLocaleDateString('es-ES');
      const docRef = doc(db, 'rutinas', this.selectedUserId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rutinas = docSnap.data();
        if (rutinas[fechaFormateada]) {
          const rutinaDelDia = rutinas[fechaFormateada];
          this.rutina = Object.keys(rutinaDelDia).map(nombreEjercicio => {
            const ejercicio = rutinaDelDia[nombreEjercicio];
            return {
              nombre: nombreEjercicio,
              grupoMuscular:ejercicio.grupoMuscular,
              series: ejercicio.series,
              repeticiones: ejercicio.repeticiones,
              descanso: ejercicio.descanso
            };
          });
        } else {
          this.rutina = []; // No hay rutina para la fecha seleccionada
        }
      } else {
        console.error('Error al recuperar la rutina del usuario:', this.selectedUserId);
      }
    },
    async agregarRutina() {
      try {
        const docRef = doc(db, "rutinas", this.selectedUserId);
        const docSnap = await getDoc(docRef);
        let rutinas = {};

        if (docSnap.exists()) {
          rutinas = docSnap.data() || {};
        }
        // Obtener la fecha en formato "dd-mm-yyyy"
        const fechaFormateada = this.fechaSeleccionada.toLocaleDateString("es-ES");
        // Crear un objeto para almacenar los ejercicios seleccionados
        const ejerciciosRutina = {};
        
        this.ejerciciosSeleccionados.forEach((ejercicio) => {
          ejerciciosRutina[ejercicio.nombre] = {
            ...ejercicio, // Concatena las propiedades del ejercicio original
            series: ejercicio.series,
            repeticiones: ejercicio.repeticiones,
            descanso: ejercicio.descanso,
            ejercicioRealizado: false,
          };
        });

        // Asignar los ejercicios a la fecha correspondiente en el objeto rutinas
        rutinas[fechaFormateada] = ejerciciosRutina;

        await setDoc(docRef, rutinas, { merge: true });

        // Limpiar los campos del formulario
        this.fechaSeleccionada = null;
        this.ejerciciosSeleccionados = [];

        console.log("Fecha agregada a la rutina correctamente.");
      } catch (error) {
        console.error("Error al agregar la fecha:", error);
      }

    },
    seleccionarEjercicio(ejercicio) {
      const index = this.ejerciciosSeleccionados.findIndex(e => e.nombre === ejercicio.nombre);
      if (index !== -1) {
        // Si el ejercicio ya está seleccionado, eliminarlo
        this.ejerciciosSeleccionados.splice(index, 1);
      } else {
        // Si el ejercicio no está seleccionado, agregarlo
        this.ejerciciosSeleccionados.push(ejercicio);
      }
    },
    filtrarEjercicios() {
      if (!this.filtroGruposMusculares) {
        return [];
      }

      let ejerciciosFiltrados = this.ejercicios.filter(ejercicio => ejercicio.grupoMuscular === this.filtroGruposMusculares);

      if (this.busqueda.length > 0) {
        const busquedaMinuscula = this.busqueda.toLowerCase();
        ejerciciosFiltrados = ejerciciosFiltrados.filter(ejercicio =>
          ejercicio.nombre.toLowerCase().includes(busquedaMinuscula) ||
          ejercicio.grupoMuscular.toLowerCase().includes(busquedaMinuscula)
        );
      }

      return ejerciciosFiltrados;
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
    async ejerciciosCargado() {
      try {
        const querySnapshot = await getDocs(collection(db, "ejercicios"));
        this.ejercicios = [];
        this.gruposMusculares = []; // Reinicializar la lista de Grupos Musculares
        querySnapshot.forEach((doc) => {
          const ejercicio = doc.data();
          this.ejercicios.push(ejercicio);
          if (!this.gruposMusculares.includes(ejercicio.grupoMuscular)) {
            this.gruposMusculares.push(ejercicio.grupoMuscular); // Agregar grupo muscular si no existe en la lista
          }
        });
        this.ejercicios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log("Ejercicios cargados:", this.ejercicios);
        console.log("Grupos Musculares de ejercicio:", this.gruposMusculares);
      } catch (error) {
        console.error("Error al cargar los ejercicios:", error);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    console.clear();
    const userStore = useUserStore();
    const selectedUserId = userStore.selectedUserId;
    const isLocalAdmin = userStore.isAdmin;
    //console.log(`Se selecciono al usuario: ${selectedUserId}`);
    console.log(`isAdmin dentro del before es: ${userStore.isAdmin}`);
    next((vm) => {
      vm.selectedUserId = selectedUserId; // Asigna el ID del usuario seleccionado a la variable local
      vm.isLocalAdmin = isLocalAdmin;
    });
  },
  mounted() {
    this.usuarioCargado();
    this.ejerciciosCargado();
  },
  watch: {
    fechaSeleccionada() {
      this.mostrarRutina(); // Mostrar rutina al cambiar la fecha seleccionada
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

/*.tabla_ejercicios tr:hover {
  background-color: #f9f9f9;
}*/

.section-right{
  margin-top: 90px;
}
</style>
