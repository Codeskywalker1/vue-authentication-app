<template>
    <div class="plan-entrenamiento">
      <header>
        <div class="cuenta">
          {{ nombreUsuario }}
        </div>
        <div class="mi-avance">
          <progress-bar :porcentaje="avance" />
        </div>
        <div class="ranking">
          Posición: {{ ranking }}
        </div>
        <div class="ranking-global">
          <a href="#">Ranking Global</a>
        </div>
        <div class="citas">
          <a href="#">Citas</a>
        </div>
        <div class="cerrar-sesion">
          <a href="#">Cerrar Sesión</a>
        </div>
      </header>
      <div class="rutina-content">
        <h1>Rutina personalizada</h1>
        <input type="date" v-model="fechaSeleccionada" @change="cargarRutina" />
        <section v-if="rutinaCargada">
          <ul>
            <li v-for="ejercicio in rutina" :key="ejercicio.id">
              <div class="nombre-ejercicio">{{ ejercicio.nombre }}</div>
              <div class="detalle-ejercicio">
                <span class="repeticiones">Repeticiones: {{ ejercicio.repeticiones }}</span>
                <button @click="marcarHecho(ejercicio.id)">Hecho</button>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <footer>
        <button @click="regresar">Regresar</button>
        <button @click="terminar">Terminar</button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlanEntrenamiento',
    data() {
      return {
        nombreUsuario: 'Usuario',
        avance: 50,
        ranking: 12,
        fechaSeleccionada: '',
        rutinaCargada: false,
        rutina: [
          { id: 1, nombre: 'Press con mancuernas', repeticiones: 3, peso: 50 },
          { id: 2, nombre: 'Dominadas', repeticiones: 4, peso: 'Sin peso' },
          // Agregar más ejercicios
        ],
      };
    },
    methods: {
      cargarRutina() {
        // Aquí puedes cargar la rutina correspondiente a la fecha seleccionada
        this.rutinaCargada = true;
      },
      marcarHecho(idEjercicio) {
        // Aquí puedes implementar la lógica para marcar el ejercicio como hecho
        console.log(`Ejercicio ${idEjercicio} marcado como hecho`);
      },
      regresar() {
        // Aquí puedes implementar la lógica para regresar
      },
      terminar() {
        // Aquí puedes implementar la lógica para terminar y enviar la rutina
      },
    },
  };
  </script>
  
  <style>
  /* Estilos para la interfaz */
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
  }
  
  input[type="date"] {
    padding: 5px;
    font-size: 14px;
  }
  
  .rutina-content {
    padding: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .nombre-ejercicio {
    font-weight: bold;
  }
  
  .repeticiones {
    margin-right: 10px;
  }
  
  button {
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  footer {
    padding: 20px;
    text-align: right;
  }
  
  </style>
  