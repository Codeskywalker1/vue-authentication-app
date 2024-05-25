<template>
  <div class="container">
    <header class="header">
      <navBarAdministrador />
    </header>
    <section>
      <div>
        <h2>Agendar Cita</h2>
        <form @submit.prevent="agendarCita">
          <div>
            <label for="tipoCita">Tipo de Cita:</label>
            <select v-model="tipoCita" id="tipoCita" required>
              <option value="entrenador">Entrenador</option>
              <option value="medico">Médico</option>
            </select>
          </div>
          <div>
            <label for="fechaCita">Fecha de la Cita:</label>
            <Vue3Datepicker v-model="fechaCita" :typeable="true" required />
          </div>
          <div>
            <label for="horaCita">Hora de la Cita:</label>
            <select v-model="horaCita" id="horaCita" required>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
          <div class="button">
            <button type="submit">Agendar Cita</button>
          </div>
        </form>
      </div>
    </section>
    <section>
      <h3>Mis Citas</h3>
      <div v-for="(citas, tipo) in citasPorTipo" :key="tipo">
        <h4>{{ tipo }}</h4>
        <ul>
          <li v-for="(cita, index) in citas" :key="index">
            {{ cita.fecha }} - {{ cita.hora }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import navBarAdministrador from "@/components/navBarAdministrador.vue";
import Vue3Datepicker from "vue3-datepicker";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/index";

export default {
  components: {
    navBarAdministrador,
    Vue3Datepicker,
  },
  data() {
    return {
      isLocalAdmin: false,
      selectedUserId: null,
      currentUserUID: null,
      tipoCita: "",
      fechaCita: null,
      horaCita: null,
      horarios: [],
      citasPorTipo: {}
    };
  },
  methods: {
    async agendarCita() {
      try {
        let uidToUse = this.selectedUserId;

        if (this.isLocalAdmin === false) {
          uidToUse = this.currentUserUID;
        }

        if (!this.tipoCita || !this.fechaCita || !this.horaCita) {
          console.error("Por favor, seleccione el tipo de cita, la fecha y la hora.");
          return;
        }

        const fecha = this.fechaCita.toISOString().split('T')[0]; // Formatear fecha

        // Agregar la cita en la base de datos
        const citaRef = doc(db, "citas", uidToUse);
        const citaDoc = await getDoc(citaRef);

        const nuevaCita = {
          tipo: this.tipoCita,
          hora: this.horaCita,
        };

        if (citaDoc.exists()) {
          const citas = citaDoc.data().citas || {};
          if (!citas[fecha]) {
            citas[fecha] = [];
          }
          citas[fecha].push(nuevaCita);
          await setDoc(citaRef, { citas }, { merge: true });
        } else {
          await setDoc(citaRef, { citas: { [fecha]: [nuevaCita] } });
        }

        console.log("Cita agendada correctamente.");
        this.fechaCita = null;
        this.horaCita = null;
        this.tipoCita = "";
        this.mostrarCitas(); // Actualizar citas mostradas
      } catch (error) {
        console.error("Error al agendar la cita:", error);
      }
    },
    async mostrarCitas() {
      try {
        let uidToUse = this.selectedUserId;

        if (this.isLocalAdmin === false) {
          uidToUse = this.currentUserUID;
        }

        const citaRef = doc(db, "citas", uidToUse);
        const citaDoc = await getDoc(citaRef);

        if (citaDoc.exists()) {
          const citas = citaDoc.data().citas || {};
          const citasPorTipo = {};

          for (const [fecha, citasEnFecha] of Object.entries(citas)) {
            for (const cita of citasEnFecha) {
              if (!citasPorTipo[cita.tipo]) {
                citasPorTipo[cita.tipo] = [];
              }
              citasPorTipo[cita.tipo].push({ fecha, hora: cita.hora });
            }
          }

          this.citasPorTipo = citasPorTipo;
        } else {
          this.citasPorTipo = {};
        }
      } catch (error) {
        console.error("Error al mostrar las citas:", error);
      }
    }
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUID = user.uid;
        console.log("El usuario actual es ", this.currentUserUID);
        this.mostrarCitas(); // Mostrar citas al montar el componente
      }
    });
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.section {
  padding: 20px;
}

.button {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
