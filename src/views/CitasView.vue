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
          <div v-if="tipoCita && fechaCita">
            <label for="horaCita">Hora de la Cita:</label>
            <select v-if="horasDisponibles.length" v-model="horaCita" id="horaCita" required>
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
            </select>
            <p v-else>Ya no hay citas para este día</p>
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
      horarios: ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
      citasPorTipo: {},
      todasLasCitas: [],
      horasDisponibles: [],
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

        const fecha = this.fechaCita.toISOString().split('T')[0];

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
        this.mostrarCitas();
        this.cargarTodasLasCitas();
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
    },
    async cargarTodasLasCitas() {
      try {
        const citasSnapshot = await getDocs(collection(db, "citas"));
        const todasLasCitas = [];

        citasSnapshot.forEach((doc) => {
          const citas = doc.data().citas || {};
          for (const [fecha, citasEnFecha] of Object.entries(citas)) {
            for (const cita of citasEnFecha) {
              todasLasCitas.push({ tipo: cita.tipo, fecha, hora: cita.hora });
            }
          }
        });

        this.todasLasCitas = todasLasCitas;
        this.actualizarHorasDisponibles();
      } catch (error) {
        console.error("Error al cargar todas las citas:", error);
      }
    },
    actualizarHorasDisponibles() {
      if (!this.tipoCita || !this.fechaCita) {
        this.horasDisponibles = this.horarios;
        return;
      }

      const fecha = this.fechaCita.toISOString().split('T')[0];
      const citasEnFecha = this.todasLasCitas.filter(cita => cita.tipo === this.tipoCita && cita.fecha === fecha);

      const horasOcupadas = citasEnFecha.map(cita => cita.hora);
      this.horasDisponibles = this.horarios.filter(hora => !horasOcupadas.includes(hora));
    }
  },
  watch: {
    tipoCita() {
      this.actualizarHorasDisponibles();
    },
    fechaCita() {
      this.actualizarHorasDisponibles();
    }
  },
  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();
    const selectedUserId = userStore.selectedUserId;
    const isLocalAdmin = userStore.isAdmin;
    next((vm) => {
      vm.selectedUserId = selectedUserId;
      vm.isLocalAdmin = isLocalAdmin;
    });
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUID = user.uid;
        this.mostrarCitas();
        this.cargarTodasLasCitas();
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
