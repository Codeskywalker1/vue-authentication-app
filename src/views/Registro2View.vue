<template>
    <div class="form-container">
      <h2>Datos Deportivos</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="deporte">¿Haces algún deporte?</label>
          <input type="text" id="deporte" name="deporte" v-model="formData.deporte" required />
        </div>
        <div class="form-group">
          <label for="objetivo">¿Cuál es tu objetivo?</label>
          <input type="text" id="objetivo" name="objetivo" v-model="formData.objetivo" required />
        </div>
        <div class="form-group">
          <label for="diasSemana">¿Cuántos días a la semana?</label>
          <input type="text" id="diasSemana" name="diasSemana" v-model="formData.diasSemana" required />
        </div>
        <div class="form-group">
          <label for="tiempo">¿Cuánto tiempo?</label>
          <input type="text" id="tiempo" name="tiempo" v-model="formData.tiempo" required />
        </div>
        <div class="form-group">
          <label for="tipoEntrenamiento">¿Qué tipo de entrenamiento?</label>
          <input type="text" id="tipoEntrenamiento" name="tipoEntrenamiento" v-model="formData.tipoEntrenamiento" required />
        </div>
        <div class="form-group">
          <label for="desdeCuanto">¿Desde hace cuánto?</label>
          <input type="text" id="desdeCuanto" name="desdeCuanto" v-model="formData.desdeCuanto" required />
        </div>
        <div class="form-group">
          <label for="peso">Peso</label>
          <input type="text" id="peso" name="peso" v-model="formData.peso" required />
        </div>
        <div class="form-group">
          <label for="estatura">Estatura</label>
          <input type="text" id="estatura" name="estatura" v-model="formData.estatura" required />
        </div>
        <div class="button-container">
          <button type="submit">Siguiente</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          deporte: "",
          objetivo: "",
          diasSemana: "",
          tiempo: "",
          tipoEntrenamiento: "",
          desdeCuanto: "",
          peso: "",
          estatura: "",
        },
      };
    },
    methods: {
      handleSubmit() {
      
        console.log(this.formData);
       
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .button-container {
    text-align: center;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50; /* Green */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  