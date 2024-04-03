<template>
  <div class="form-container">
    <h2>Datos personales</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombres">Nombres:</label>
        <input type="text" id="nombres" name="nombres" v-model="formData.nombres" required />
      </div>
      <div class="form-group">
        <label for="apellidoPaterno">Apellido paterno:</label>
        <input type="text" id="apellidoPaterno" name="apellidoPaterno" v-model="formData.apellidoPaterno" required />
      </div>
      <div class="form-group">
        <label for="apellidoMaterno">Apellido materno:</label>
        <input type="text" id="apellidoMaterno" name="apellidoMaterno" v-model="formData.apellidoMaterno" required />
      </div>
      <div class="form-group">
        <label for="fechaNacimiento">Fecha de nacimiento:</label>
        <input type="date" id="fechaNacimiento" name="fechaNacimiento" v-model="formData.fechaNacimiento" required />
      </div>
      <div class="form-group">
        <label for="estadoCivil">Estado civil:</label>
        <select id="estadoCivil" name="estadoCivil" v-model="formData.estadoCivil" required>
          <option value="">Selecciona</option>
          <option value="soltero">Soltero(a)</option>
          <option value="casado">Casado(a)</option>
          <option value="viudo">Viudo(a)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" name="correo" v-model="formData.correo" required />
      </div>
      <div class="form-group">
        <label for="domicilio">Domicilio:</label>
        <textarea id="domicilio" name="domicilio" v-model="formData.domicilio" required></textarea>
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
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaNacimiento: "",
        estadoCivil: "",
        correo: "",
        domicilio: "",
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
