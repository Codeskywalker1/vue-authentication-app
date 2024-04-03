<template>
    <div class="asignar-ejercicios">
      <header>
        <!-- Barra de navegación -->
      </header>
      <div class="calendario">
        <h1>Asignar Ejercicios</h1>
        <input type="date" v-model="fechaSeleccionada" @change="cargarEjercicios" />
        <div v-if="ejerciciosCargados">
          <div v-for="(grupo, index) in gruposMusculares" :key="index">
            <h2>{{ grupo }}</h2>
            <ul>
              <li v-for="ejercicio in ejerciciosPorGrupo(grupo)" :key="ejercicio.id">
                <input type="checkbox" :id="ejercicio.id" v-model="ejercicio.asignado" />
                <label :for="ejercicio.id">{{ ejercicio.nombre }}</label>
              </li>
            </ul>
          </div>
        </div>
        <p v-else>No hay ejercicios para esta fecha.</p>
      </div>
      <footer>
        <button @click="regresar">Regresar</button>
        <button @click="guardarEjercicios">Guardar</button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fechaSeleccionada: '',
        ejerciciosCargados: false,
        ejercicios: [
          { id: 1, nombre: 'Press de banca', asignado: false, grupoMuscular: 'Pecho' },
          { id: 2, nombre: 'Sentadillas', asignado: false, grupoMuscular: 'Piernas' },
          { id: 3, nombre: 'Flexiones de brazos', asignado: false, grupoMuscular: 'Pecho' },
          // Agregar más ejercicios
        ],
      };
    },
    computed: {
      gruposMusculares() {
        return [...new Set(this.ejercicios.map(e => e.grupoMuscular))];
      }
    },
    methods: {
      cargarEjercicios() {
        // Implementar la lógica para cargar los ejercicios por fecha
        this.ejerciciosCargados = true;
      },
      ejerciciosPorGrupo(grupo) {
        return this.ejercicios.filter(e => e.grupoMuscular === grupo);
      },
      guardarEjercicios() {
        // Implementar la lógica para guardar los ejercicios asignados
        console.log('Ejercicios guardados');
      },
      regresar() {
        // Implementar la lógica de regresar
      }
    }
  };
  </script>
  
  <style>
  /* Estilos para la interfaz */
  
  .calendario {
    padding: 20px;
  }
  
  h2 {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  footer {
    padding: 20px;
    text-align: right;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  </style>
  