<template>
    <div class="asignar-alimentos">
      <header>
        <!-- Barra de navegación -->
      </header>
      <div class="calendario">
        <h1>Asignar Alimentos por Día</h1>
        <input type="date" v-model="fechaSeleccionada" @change="cargarAlimentos" />
        <div class="alimentos">
          <div v-for="(grupo, index) in gruposAlimentos" :key="index">
            <h3>{{ grupo.nombre }}</h3>
            <ul>
              <li v-for="alimento in grupo.alimentos" :key="alimento.id" @click="seleccionarAlimento(alimento)">
                {{ alimento.nombre }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <button @click="regresar">Regresar</button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fechaSeleccionada: '',
        gruposAlimentos: [
          {
            nombre: 'Proteínas',
            alimentos: [
              { id: 1, nombre: 'Pollo' },
              { id: 2, nombre: 'Carne' },
              { id: 3, nombre: 'Pescado' },
            ],
          },
          {
            nombre: 'Carbohidratos',
            alimentos: [
              { id: 4, nombre: 'Arroz' },
              { id: 5, nombre: 'Pasta' },
              { id: 6, nombre: 'Pan' },
            ],
          },
          // Agregar más grupos y alimentos
        ],
        alimentosAsignados: [],
      };
    },
    methods: {
      cargarAlimentos() {
        // Implementar lógica para cargar los alimentos asignados para la fecha seleccionada
      },
      seleccionarAlimento(alimento) {
        // Implementar lógica para asignar el alimento seleccionado para la fecha seleccionada
        this.alimentosAsignados.push({
          fecha: this.fechaSeleccionada,
          alimento: alimento.nombre,
        });
      },
      regresar() {
        // Implementar lógica de regresar
      },
    },
  };
  </script>
  
  <style>
  /* Estilos para la interfaz */
  
  header {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  .calendario {
    padding: 20px;
  }
  
  .alimentos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  li:hover {
    background-color: #f0f0f0;
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
    color: white;
    cursor: pointer;
  }
  </style>
  