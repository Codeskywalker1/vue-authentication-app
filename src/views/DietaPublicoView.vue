<template>
  <h1>Hola</h1>
  <div>
    <DietaDetalle :id="idFromRoute" />
  </div>
</template>

<script>
import DietaDetalle from "@/components/DietaDetalle.vue";
export default {
  props: {
    id: String,
  },
  components: {
    DietaDetalle,
  },
  computed: {
    idFromRoute() {
      // Access the ID from the route (assuming it's a dynamic parameter)
      return this.$route.params.id;
    },
  },
  data() {
    return {
      idDietaSeleccionada: null,
    };
  },
  mounted() {
    this.idDietaSeleccionada = this.$route.params.id;
  },
};
/*export default {
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
  };*/
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