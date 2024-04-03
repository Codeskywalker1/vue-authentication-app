<template>
    <div class="form-container">
      <h2>Datos adicionales</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="alimentosFavoritos">Alimentos favoritos:</label>
          <textarea id="alimentosFavoritos" name="alimentosFavoritos" v-model="formData.alimentosFavoritos"></textarea>
        </div>
        <div class="form-group">
          <label for="alimentosNoGustan">Alimentos que no te gustan:</label>
          <textarea id="alimentosNoGustan" name="alimentosNoGustan" v-model="formData.alimentosNoGustan"></textarea>
        </div>
        <div class="form-group">
          <label for="alimentosAlergico">Alimentos a los que eres alérgico:</label>
          <textarea id="alimentosAlergico" name="alimentosAlergico" v-model="formData.alimentosAlergico"></textarea>
        </div>
        <div class="form-group">
          <label for="antecedentesMedicos">Antecedentes médicos familiares:</label>
          <textarea id="antecedentesMedicos" name="antecedentesMedicos" v-model="formData.antecedentesMedicos"></textarea>
        </div>
        <div class="form-group">
          <label for="antecedentesPatologicos">Antecedentes patológicos:</label>
          <textarea id="antecedentesPatologicos" name="antecedentesPatologicos" v-model="formData.antecedentesPatologicos"></textarea>
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
          alimentosFavoritos: "",
          alimentosNoGustan: "",
          alimentosAlergico: "",
          antecedentesMedicos: "",
          antecedentesPatologicos: "",
        },
      };
    },
    methods: {
      handleSubmit() {
        // Submit form data here
        console.log(this.formData);
        // You can also submit the data to a server-side API here
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
  