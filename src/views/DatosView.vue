<template>
  <div class="form-container">
    <h2>Datos personales</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group" :class="{ focused: formData.nombres !== '' }">
          <input type="text" id="nombres" name="nombres" v-model="formData.nombres" :readonly="!formDataEditable"
            required autocomplete="off"/>
          <label for="nombres" v-bind:class="{
            active: formData.nombres !== '',
            'fixed-label': !formDataEditable,
          }">
            Nombres:
          </label>
        </div>
        <div class="form-group" :class="{ focused: formData.apellidoPaterno !== '' }">
          <input type="text" id="apellidoPaterno" name="apellidoPaterno" v-model="formData.apellidoPaterno"
            :readonly="!formDataEditable" required autocomplete="off"/>
          <label for="apellidoPaterno" v-bind:class="{
            active: formData.apellidoPaterno !== '',
            'fixed-label': !formDataEditable,
          }">
            Apellido paterno:
          </label>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" :class="{ focused: formData.apellidoMaterno !== '' }">
          <input type="text" id="apellidoMaterno" name="apellidoMaterno" v-model="formData.apellidoMaterno"
            :readonly="!formDataEditable" required autocomplete="off"/>
          <label for="apellidoMaterno" v-bind:class="{
            active: formData.apellidoMaterno !== '',
            'fixed-label': !formDataEditable,
          }">
            Apellido materno:
          </label>
        </div>
        <div class="form-group" :class="{ focused: formData.fechaNacimiento !== '' }">
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" v-model="formData.fechaNacimiento"
            :readonly="!formDataEditable" required />
          <label for="fechaNacimiento" v-bind:class="{
            active: formData.fechaNacimiento !== '',
            'fixed-label': !formDataEditable,
          }">
            Fecha de nacimiento:</label>
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
        <div class="form-group" :class="{ focused: formData.edad !== '' }">
          <input type="text" id="edad" name="edad" v-model="edadCalculada" readonly />
          <label for="edad" v-bind:class="{ active: formData.edad !== '' }">Edad:</label>
        </div>
      </div>
      <div class="form-group full-width">
        <textarea id="domicilio" name="domicilio" v-model="formData.domicilio" required></textarea>
        <label for="domicilio">Domicilio:</label>
      </div>
      <h2>Datos Deportivos</h2>
      <div class="form-group">
        <select id="deporte" name="deporte" v-model="formData.deporte" required>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
        <label for="deporte">¿Haces algún deporte?</label>
      </div>
      <div v-if="formData.deporte === 'Si'">
        <div class="form-group">
          <select id="diasEntrenamiento" name="diasEntrenamiento" v-model="formData.diasEntrenamiento" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <label for="diasEntrenamiento">¿Cuántos días a la semana?</label>
        </div>
        <div class="form-group">

          <select id="tiempoPorDiaEntrenamiento" name="tiempoPorDiaEntrenamiento"
            v-model="formData.tiempoPorDiaEntrenamiento" required>
            <option value="1">0 a 30 minutos</option>
            <option value="1">30 minutos a 1 hora</option>
            <option value="3">2 o más horas</option>
          </select>
          <label for="tiempoPorDiaEntrenamiento">¿Cuántas horas al día entrenas?</label>
        </div>
        <div class="form-group">

          <select id="tipoEntrenamiento" name="tipoEntrenamiento" v-model="formData.tipoEntrenamiento" required>
            <option value="1">Gimnasio (pesas)</option>
            <option value="2">Peso Corporal</option>
            <option value="3">Entrenamiento en casa</option>
            <option value="4">Al aire libre</option>
          </select>
          <label for="tipoEntrenamiento">¿Qué tipo de entrenamiento?</label>
        </div>
        <div class="form-group">
          <select id="antiguedadEntrenamiento" class="seleccion" name="antiguedadEntrenamiento"
            v-model="formData.antiguedadEntrenamiento" required>
            <option value="1"> Menos de 3 meses </option>
            <option value="2"> Más de 3 meses </option>
          </select>
          <label for="antiguedadEntrenamiento">¿Desde hace cuánto?</label>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" :class="{ focused: formData.peso !== '' }">
          <input type="text" id="peso" name="peso" v-model="formData.peso" @focus="handleFocus" @blur="handleBlur"
            required />
          <label for="peso">Peso</label>
        </div>
        <div class="form-group" :class="{ focused: formData.estatura !== '' }">
          <input type="text" id="estatura" name="estatura" v-model="formData.estatura" @focus="handleFocus"
            @blur="handleBlur" required />
          <label for="estatura">Estatura</label>
        </div>
      </div>
      <div class="form-group">

        <select id="objetivo" name="objetivo" v-model="formData.objetivo" required>
          <option value="1"> Bajar de peso </option>
          <option value="2"> Tonificar </option>
          <option value="1"> Aumentar músculo </option>
          <option value="2"> MMantenerse en forma </option>
        </select>
        <label for="objetivo">¿Cuál es tu objetivo?</label>
      </div>
      <h2>Datos adicionales</h2>
      <div class="form-group">
        <textarea id="alimentosFavoritos" name="alimentosFavoritos" v-model="formData.alimentosFavoritos"
          required></textarea>
        <label for="alimentosFavoritos">Alimentos favoritos:</label>
      </div>
      <div class="form-group">
        <textarea id="alimentosDisgutan" name="alimentosDisgutan" v-model="formData.alimentosDisgutan"
          required></textarea>
        <label for="alimentosDisgutan">Alimentos que no te gustan:</label>
      </div>
      <div class="form-group">
        <textarea id="alimentosAlergico" name="alimentosAlergico" v-model="formData.alimentosAlergico"
          required></textarea>
        <label for="alimentosAlergico">Alimentos a los que eres alérgico:</label>
      </div>
      <div class="form-group">
        <textarea id="antecedentesMedicos" name="antecedentesMedicos" v-model="formData.antecedentesMedicos"
          required></textarea>
        <label for="antecedentesMedicos">Antecedentes médicos familiares:</label>
      </div>
      <div class="form-group" :class="{ focused: formData.antecedentesPatologicos !== '' }">
        <textarea id="antecedentesPatologicos" name="antecedentesPatologicos" v-model="formData.antecedentesPatologicos"
          :readonly="!formDataEditable" required></textarea>
        <label for="antecedentesPatologicos" v-bind:class="{
          active: formData.antecedentesPatologicos !== '',
          'fixed-label': !formDataEditable,
        }"> Antecedentes patológicos:</label>
      </div>
      <div class="button-container">
        <button class="return" @click="redirectToHome">Return</button>
        <button type="submit">Finalizar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { db, auth } from "../Firebase/index"; // Asegúrate de importar auth de Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      formData: {},
      isLocalAdmin: false, // Inicializar isAdmin en false
      selectedUserId: null,
      currentUserUID: null, // Agregar variable para almacenar la UID del usuario actual
      edadCalculada: null,
      formDataEditable: false,
    };
  },
  watch: {
    "formData.fechaNacimiento": function (newDate, oldDate) {
      this.edadCalculada = this.calcularEdad(newDate); // Calcular la edad y almacenarla en edadCalculada
    },
  },
  methods: {
    async cargarUsuario() {
      try {
        let uidToUse = this.selectedUserId;

        if (this.isLocalAdmin === false) {
          uidToUse = this.currentUserUID;
        }

        const docRef = doc(db, "usuarios", uidToUse);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.usuario = docSnap.data();

          // Validar el campo "datos" para determinar si se puede editar
          if (this.usuario.datos === false && this.isLocalAdmin === false) {
            // Permitir la edición de todos los campos excepto la edad
            this.formDataEditable = true;
          } else if (
            this.usuario.datos === true &&
            this.isLocalAdmin === false
          ) {
            // No permitir la edición de ningún campo
            this.formDataEditable = false;
          } else {
            // Permitir la edición de todos los campos excepto la edad
            this.formDataEditable = true;
          }

          this.formData = {
            nombres: this.usuario.nombre || "",
            apellidoPaterno: this.usuario.apellidoPaterno || "",
            apellidoMaterno: this.usuario.apellidoMaterno || "",
            fechaNacimiento: this.usuario.fechaNacimiento || "",
            estadoCivil: this.usuario.estadoCivil || "",
            domicilio: this.usuario.domicilio || "",
            deporte: this.usuario.deporte || "",
            objetivo: this.usuario.objetivo || "",
            diasEntrenamiento: this.usuario.diasEntrenamiento || "",
            tiempoPorDiaEntrenamiento:
              this.usuario.tiempoPorDiaEntrenamiento || "",
            tipoEntrenamiento: this.usuario.tipoEntrenamiento || "",
            antiguedadEntrenamiento: this.usuario.antiguedadEntrenamiento || "",
            peso: this.usuario.peso || "",
            estatura: this.usuario.estatura || "",
            alimentosFavoritos: this.usuario.alimentosFavoritos || "",
            alimentosDisgutan: this.usuario.alimentosDisgutan || "",
            alimentosAlergico: this.usuario.alimentosAlergico || "",
            antecedentesMedicos: this.usuario.antecedentesMedicos || "",
            antecedentesPatologicos: this.usuario.antecedentesPatologicos || "",
            email: this.usuario.email || "",
            isAdmin: this.usuario.isAdmin,
            datos: this.usuario.datos,
          };

          // Validar el campo "datos" para determinar si se puede editar
          if (this.usuario.datos === false && this.isLocalAdmin === false) {
            // Permitir la edición de todos los campos excepto la edad
            this.formDataEditable = true;
          } else if (
            this.usuario.datos === true &&
            this.isLocalAdmin === false
          ) {
            // No permitir la edición de ningún campo
            this.formDataEditable = false;
          } else {
            // Permitir la edición de todos los campos excepto la edad
            this.formDataEditable = true;
          }
        } else {
          console.log(
            "No se encontró ningún documento con el ID:",
            this.selectedUserId
          );
        }
      } catch (error) {
        console.error("Error al cargar el usuario, el usuario no se encuentra");
      }
    },

    calcularEdad(fechaNacimiento) {
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    redirectToHome() {
      const userStore = useUserStore();
      if (userStore.isAdmin) {
        this.$router.push("/clientes");
      } else {
        this.$router.push("/dashboard");
      }
    },
    handleSubmit() {
      try {
        let uidToUse = this.selectedUserId;
        if (this.isLocalAdmin === false) {
          uidToUse = this.currentUserUID;
        }
        // Guardar los datos del formulario en Firestore
        const docRef = doc(db, "usuarios", uidToUse);
        setDoc(docRef, {
          nombre: this.formData.nombres,
          apellidoPaterno: this.formData.apellidoPaterno,
          apellidoMaterno: this.formData.apellidoMaterno,
          fechaNacimiento: this.formData.fechaNacimiento,
          estadoCivil: this.formData.estadoCivil,
          domicilio: this.formData.domicilio,
          deporte: this.formData.deporte,
          objetivo: this.formData.objetivo,
          diasEntrenamiento: this.formData.diasEntrenamiento,
          tiempoPorDiaEntrenamiento: this.formData.tiempoPorDiaEntrenamiento,
          tipoEntrenamiento: this.formData.tipoEntrenamiento,
          antiguedadEntrenamiento: this.formData.antiguedadEntrenamiento,
          peso: this.formData.peso,
          estatura: this.formData.estatura,
          alimentosFavoritos: this.formData.alimentosFavoritos,
          alimentosDisgutan: this.formData.alimentosDisgutan,
          alimentosAlergico: this.formData.alimentosAlergico,
          antecedentesMedicos: this.formData.antecedentesMedicos,
          antecedentesPatologicos: this.formData.antecedentesPatologicos,
          email: this.formData.email,
          isAdmin: this.formData.isAdmin,
          datos: true,
        });

        // Redirigir al usuario a la siguiente página
        this.$router.push("/clientes"); // Reemplaza con la ruta correcta
      } catch (error) {
        console.error("Error al guardar los datos del formulario:", error);
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();
    const selectedUserId = userStore.selectedUserId;
    const isLocalAdmin = userStore.isAdmin;
    console.log(`Se selecciono al usuario: ${selectedUserId}`);
    console.log(`isAdmin dentro del before es: ${userStore.isAdmin}`);
    next((vm) => {
      vm.selectedUserId = selectedUserId; // Asigna el ID del usuario seleccionado a la variable local
      vm.isLocalAdmin = isLocalAdmin;
    });
  },
  mounted() {
    // Escuchar cambios en la autenticación
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUID = user.uid;
        console.log("El usuario actual es ", this.currentUserUID);
        this.cargarUsuario();
      }
    });
  },
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
  margin-top: 25px;
  margin-block-end: 20px;
  flex: 1;
  margin-right: 20px;
  /* Espacio entre columnas */
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

.form-group input:focus~label,
.form-group select:focus~label,
.form-group textarea:focus~label,
.form-group input:valid~label,
.form-group select:valid~label,
.form-group textarea:valid~label {
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
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-group label.active {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.fixed-label {
  position: absolute;
  top: 10px;
  /* Ajusta el valor según sea necesario */
  left: 10px;
  /* Ajusta el valor según sea necesario */
  pointer-events: none;
  /* Para que no interfiera con la interacción del usuario */
  color: #aaa;
  /* Color más claro para indicar que no es editable */
}

#estadoCivil,
#deporte,
#diasEntrenamiento,
#tiempoPorDiaEntrenamiento,
#tipoEntrenamiento,
#antiguedadEntrenamiento {
  background-color: #282828;
  color: white;
}
</style>
