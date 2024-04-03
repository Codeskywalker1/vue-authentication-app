<template>
    <div class="clientes">
      <header>
        <!-- Barra de navegación -->
      </header>
      <div class="busqueda">
        <h1>Clientes</h1>
        <div class="input-container">
          <input type="text" v-model="busqueda" placeholder="Buscar cliente..." @input="buscarCliente" />
          <i class="fas fa-search"></i>
        </div>
        <div class="resultados">
          <div
            v-for="(cliente, index) in resultados"
            :key="index"
            class="cliente"
            @mouseenter="animarEntrada(index)"
            @mouseleave="animarSalida(index)"
            @click="seleccionarCliente(cliente)"
            :class="{ 'seleccionado': clienteSeleccionado === cliente }"
          >
            {{ cliente }}
          </div>
        </div>
      </div>
      <div class="acciones">
        <button>Agendar</button>
        <button>Rutina</button>
        <button>Dieta</button>
        <button>Avance</button>
      </div>
      <div class="seleccionado-info">
        <p>{{ clienteSeleccionado }}</p>
      </div>
      <footer>
        <button class="regresar">Regresar</button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        busqueda: '',
        clientes: [
          'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Rodríguez',
          'Laura Fernández', 'Pedro Gómez', 'Andrea González', 'Pablo Sánchez', 'Natalia Ramírez',
          'José Torres', 'Sofía Díaz', 'Miguel Vargas', 'Claudia Jiménez', 'Andrés Ruiz',
          'Patricia Hernández', 'Alejandro Medina', 'Carolina Castro', 'Javier Reyes', 'Rosa Ortega'
        ],
        resultados: [],
        clienteSeleccionado: ''
      };
    },
    methods: {
      buscarCliente() {
        this.resultados = this.clientes.filter(cliente => cliente.toLowerCase().includes(this.busqueda.toLowerCase()));
      },
      seleccionarCliente(cliente) {
        this.clienteSeleccionado = cliente;
      },
      animarEntrada(index) {
        const resultado = this.$el.getElementsByClassName('cliente')[index];
        resultado.style.transition = 'transform 0.3s';
        resultado.style.transform = 'scale(1.1)';
      },
      animarSalida(index) {
        const resultado = this.$el.getElementsByClassName('cliente')[index];
        resultado.style.transition = 'transform 0.3s';
        resultado.style.transform = 'scale(1)';
      },
      regresar() {
        // Implementar lógica de regresar
      }
    }
  };
  </script>
  
  <style>
  /* Estilos para la interfaz */
  
  .clientes {
    padding: 20px;
  }
  
  .busqueda {
    margin-bottom: 20px;
  }
  
  .busqueda h1 {
    margin-bottom: 10px;
  }
  
  .input-container {
    position: relative;
  }
  
  .input-container input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
  
  .input-container input:focus {
    outline: none;
  }
  
  .input-container i {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
  }
  
  .resultados {
    display: flex;
    flex-wrap: wrap;
  }
  
  .cliente {
    padding: 10px 20px;
    margin: 5px;
    background-color: #f9f9f9;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .cliente:hover {
    background-color: #f0f0f0;
  }
  
  .cliente.seleccionado {
    background-color: #007bff;
    color: white;
  }
  
  .acciones {
    display: flex;
    margin-bottom: 20px;
  }
  
  .acciones button {
    margin-right: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .acciones button:last-child {
    margin-right: 0;
  }
  
  .seleccionado-info {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  
  footer {
    padding: 20px;
    text-align: right;
  }
  
  .regresar {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  