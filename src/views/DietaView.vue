<template>
    <div class="dieta">
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
      <div class="dieta-content">
        <h1>Dieta personalizada</h1>
        <input type="date" v-model="fechaSeleccionada" @change="cargarDieta" />
        <section v-if="dietaCargada">
          <h2>Desayuno</h2>
          <ul>
            <li v-for="alimento in dieta.desayuno" :key="alimento.id">
              {{ alimento.nombre }}
              <button @click="marcarCumplido('desayuno', alimento.id)">Hecho</button>
            </li>
          </ul>
          <h2>Colación 1</h2>
          <ul>
            <li v-for="alimento in dieta.colacion1" :key="alimento.id">
              {{ alimento.nombre }}
              <button @click="marcarCumplido('colacion1', alimento.id)">Hecho</button>
            </li>
          </ul>
          <h2>Comida</h2>
          <ul>
            <li v-for="alimento in dieta.comida" :key="alimento.id">
              {{ alimento.nombre }}
              <button @click="marcarCumplido('comida', alimento.id)">Hecho</button>
            </li>
          </ul>
          <h2>Colación 2</h2>
          <ul>
            <li v-for="alimento in dieta.colacion2" :key="alimento.id">
              {{ alimento.nombre }}
              <button @click="marcarCumplido('colacion2', alimento.id)">Hecho</button>
            </li>
          </ul>
          <h2>Cena</h2>
          <ul>
            <li v-for="alimento in dieta.cena" :key="alimento.id">
              {{ alimento.nombre }}
              <button @click="marcarCumplido('cena', alimento.id)">Hecho</button>
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
    name: 'Dieta',
    data() {
      return {
        nombreUsuario: 'Usuario',
        avance: 50,
        ranking: 12,
        fechaSeleccionada: '',
        dietaCargada: false,
        dieta: {
          desayuno: [
            { id: 1, nombre: 'Pan integral' },
            { id: 2, nombre: 'Jugo de naranja' },
            // Agregar más alimentos
          ],
          colacion1: [
            { id: 3, nombre: 'Yogur natural' },
            // Agregar más alimentos
          ],
          comida: [
            { id: 4, nombre: 'Pollo a la plancha' },
            // Agregar más alimentos
          ],
          colacion2: [
            { id: 5, nombre: 'Fruta' },
            // Agregar más alimentos
          ],
          cena: [
            { id: 6, nombre: 'Ensalada verde' },
            // Agregar más alimentos
          ],
        },
      };
    },
    methods: {
      cargarDieta() {
        // Aquí puedes cargar la dieta correspondiente a la fecha seleccionada
        this.dietaCargada = true;
      },
      marcarCumplido(tipo, idAlimento) {
        // Aquí puedes implementar la lógica para marcar el alimento como cumplido
        console.log(`Alimento ${idAlimento} (${tipo}) marcado como cumplido`);
      },
      regresar() {
        // Aquí puedes implementar la lógica para regresar
      },
      terminar() {
        // Aquí puedes implementar la lógica para terminar y enviar la dieta
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
  
  .dieta-content {
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
  