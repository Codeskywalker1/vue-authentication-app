<template>
    <div class="form-container">
      <h2>Datos personales</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <input type="text" id="nombres" name="nombres" v-model="formData.nombres" required />
            <label for="nombres">Nombres:</label>
          </div>
          <div class="form-group">
            <input type="text" id="apellidoPaterno" name="apellidoPaterno" v-model="formData.apellidoPaterno" required />
            <label for="apellidoPaterno">Apellido paterno:</label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <input type="text" id="apellidoMaterno" name="apellidoMaterno" v-model="formData.apellidoMaterno" required />
            <label for="apellidoMaterno">Apellido materno:</label>
          </div>
          <div class="form-group">
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" v-model="formData.fechaNacimiento" required />
            <label for="fechaNacimiento">Fecha de nacimiento:</label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <select id="estadoCivil" name="estadoCivil" v-model="formData.estadoCivil" required>
              
              <option value="soltero">Soltero(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="viudo">Viudo(a)</option>
            </select>
            <label for="estadoCivil">Estado civil:</label>
          </div>
        </div>
        <div class="form-group full-width">
          <textarea id="domicilio" name="domicilio" v-model="formData.domicilio" required></textarea>
          <label for="domicilio">Domicilio:</label>
        </div>
        <h2>Datos Deportivos</h2>
        <div class="form-group" :class="{ 'focused': formData.deporte !== '' }">
          <input type="text" id="deporte" name="deporte" v-model="formData.deporte" @focus="handleFocus" @blur="handleBlur" required />
          <label for="deporte">¿Haces algún deporte?</label>
      
        </div>
        <div class="form-group" :class="{ 'focused': formData.objetivo !== '' }">
          <input type="text" id="objetivo" name="objetivo" v-model="formData.objetivo" @focus="handleFocus" @blur="handleBlur" required />
          <label for="objetivo">¿Cuál es tu objetivo?</label>
          
        </div>
        <div class="form-group" :class="{ 'focused': formData.diasSemana !== '' }">
          <input type="text" id="diasSemana" name="diasSemana" v-model="formData.diasSemana" @focus="handleFocus" @blur="handleBlur" required />
          <label for="diasSemana">¿Cuántos días a la semana?</label>
          
        </div>
        <div class="form-group" :class="{ 'focused': formData.tiempo !== '' }">
          <input type="text" id="tiempo" name="tiempo" v-model="formData.tiempo" @focus="handleFocus" @blur="handleBlur" required />
          <label for="tiempo">¿Cuánto tiempo?</label>
          
        </div>
        <div class="form-group" :class="{ 'focused': formData.tipoEntrenamiento !== '' }">
          <input type="text" id="tipoEntrenamiento" name="tipoEntrenamiento" v-model="formData.tipoEntrenamiento" @focus="handleFocus" @blur="handleBlur" required />
          <label for="tipoEntrenamiento">¿Qué tipo de entrenamiento?</label>
          
        </div>
        <div class="form-group" :class="{ 'focused': formData.desdeCuanto !== '' }">
          <input type="text" id="desdeCuanto" name="desdeCuanto" v-model="formData.desdeCuanto" @focus="handleFocus" @blur="handleBlur" required />
          <label for="desdeCuanto">¿Desde hace cuánto?</label>
          
        </div>
        <div class="form-group" :class="{ 'focused': formData.peso !== '' }">
          <input type="text" id="peso" name="peso" v-model="formData.peso" @focus="handleFocus" @blur="handleBlur" required />
          <label for="peso">Peso</label>
          
        </div>
        <div class="form-group" :class="{ 'focused': formData.estatura !== '' }">
          <input type="text" id="estatura" name="estatura" v-model="formData.estatura" @focus="handleFocus" @blur="handleBlur" required />
          <label for="estatura">Estatura</label>
          
        </div>
        <h2>Datos adicionales</h2>
        <div class="form-group">
          <textarea id="alimentosFavoritos" name="alimentosFavoritos" v-model="formData.alimentosFavoritos" required></textarea>
          <label for="alimentosFavoritos">Alimentos favoritos:</label>
        </div>
        <div class="form-group">
          <textarea id="alimentosNoGustan" name="alimentosNoGustan" v-model="formData.alimentosNoGustan" required></textarea>
          <label for="alimentosNoGustan">Alimentos que no te gustan:</label>
        </div>
        <div class="form-group">
          <textarea id="alimentosAlergico" name="alimentosAlergico" v-model="formData.alimentosAlergico" required></textarea>
          <label for="alimentosAlergico">Alimentos a los que eres alérgico:</label>
        </div>
        <div class="form-group">
          <textarea id="antecedentesMedicos" name="antecedentesMedicos" v-model="formData.antecedentesMedicos" required></textarea>
          <label for="antecedentesMedicos">Antecedentes médicos familiares:</label>
        </div>
        <div class="form-group">
          <textarea id="antecedentesPatologicos" name="antecedentesPatologicos" v-model="formData.antecedentesPatologicos" required></textarea>
          <label for="antecedentesPatologicos">Antecedentes patológicos:</label>
        </div>
        <div class="button-container">
          <button class="return" @click="redirectToHome">Return</button>
          <button type="submit">Siguiente</button>
        </div>
      </form>
    </div>
  </template>
  
  
  
  <script>
  import { auth, db } from "../Firebase";
  import { getDoc, doc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        formData: {}
      };
    },
    methods: {
      redirectToHome() {
        this.$router.push('/');
      },
      handleSubmit() {
        // Implementa el manejo de los datos del formulario aquí
      }
    }
  };
  </script>
  
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px; 
    margin: 100px auto;
    padding: 40px;
    background: #282828;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }
  
  .form-container h2 {
    margin-bottom: 30px;
    color: #fff;
    text-align: center;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .form-group {
    flex: 1;
    margin-right: 20px; /* Espacio entre columnas */
    position: relative;
  }
  
  .form-group label {
    position: absolute;
    top: 10px;
    left: 0;
    color: #fff;
    transition: top 0.3s, font-size 0.3s;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
    color: #fff;
  }
  
  .form-group input:focus ~ label,
  .form-group select:focus ~ label,
  .form-group textarea:focus ~ label,
  .form-group input:valid ~ label,
  .form-group select:valid ~ label,
  .form-group textarea:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
  
  .form-group.full-width {
    flex-basis: 100%;
  }
  
  .button-container {
    text-align: center;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>