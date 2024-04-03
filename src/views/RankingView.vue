<template>
    <div class="ranking">
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
      <div class="ranking-content">
        <h1>Ranking Mundial</h1>
        <ul>
          <li v-for="(jugador, index) in jugadores" :key="index">
            {{ index < 10 ? (index + 1) + '. ' + jugador.nombre + ' - Puntuación: ' + jugador.puntuacion : '... ' + jugador.nombre + ' (' + (index + 1) + ')' }}
          </li>
        </ul>
      </div>
      <footer>
        <button @click="regresar">Regresar</button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Ranking',
    data() {
      return {
        nombreUsuario: 'Usuario',
        avance: 50,
        ranking: 12,
        jugadores: [
          { nombre: 'Jugador 1', puntuacion: 100 },
          { nombre: 'Jugador 2', puntuacion: 95 },
          { nombre: 'Jugador 3', puntuacion: 90 },
          { nombre: 'Jugador 4', puntuacion: 85 },
          { nombre: 'Jugador 5', puntuacion: 80 },
          { nombre: 'Jugador 6', puntuacion: 75 },
          { nombre: 'Jugador 7', puntuacion: 70 },
          { nombre: 'Jugador 8', puntuacion: 65 },
          { nombre: 'Jugador 9', puntuacion: 60 },
          { nombre: 'Jugador 10', puntuacion: 55 },
          
        ],
      };
    },
    methods: {
      regresar() {
        
      },
    },
  };
  </script>
  
  <style>
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
  }
  
  .ranking-content {
    padding: 20px;
  }
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ff5500;
    text-transform: uppercase;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    font-size: 24px;
    margin-bottom: 15px;
    background-color: #f9f9f9;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  li:hover {
    transform: scale(1.05);
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
  