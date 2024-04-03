<template>
  <div class="citas">
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
    <div class="citas-content">
      <h1>Agendar citas</h1>
      <div>
        <label for="tipoCita">Tipo de cita:</label>
        <select id="tipoCita" v-model="tipoCita">
          <option value="entrenador">Entrenador</option>
          <option value="medico">Médico</option>
        </select>
      </div>
      <div>
        <label for="fechaCita">Fecha de la cita:</label>
        <input type="datetime-local" id="fechaCita" v-model="fechaCita" />
      </div>
      <button @click="agendarCita">Agendar cita</button>
      <h2>Mis citas</h2>
      <ul v-if="citas.length">
        <li v-for="cita in citas" :key="cita.id">
          <div>{{ cita.tipo }}</div>
          <div>{{ cita.fecha }}</div>
          <div>
            <button v-if="!editando" @click="editarCita(cita.id)">Modificar</button>
            <button v-if="editando && cita.id === citaModificarId" @click="aceptarEdicion(cita.id)">Aceptar</button>
            <button @click="cancelarCita(cita.id)">Cancelar</button>
          </div>
        </li>
      </ul>
      <p v-else>No tienes citas agendadas.</p>
    </div>
    <footer>
      <button @click="regresar">Regresar</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Citas',
  data() {
    return {
      nombreUsuario: 'Usuario',
      avance: 50,
      ranking: 12,
      tipoCita: 'entrenador',
      fechaCita: '',
      citas: [],
      proximoId: 1,
      citaModificarId: null,
      editando: false,
    };
  },
  methods: {
    agendarCita() {
      if (this.fechaCita) {
        if (this.citaModificarId !== null) {
          const index = this.citas.findIndex(cita => cita.id === this.citaModificarId);
          if (index !== -1) {
            this.citas[index].tipo = this.tipoCita === 'entrenador' ? 'Entrenador' : 'Médico';
            this.citas[index].fecha = this.fechaCita;
            this.citaModificarId = null;
            this.editando = false;
          }
        } else {
          this.citas.push({
            id: this.proximoId++,
            tipo: this.tipoCita === 'entrenador' ? 'Entrenador' : 'Médico',
            fecha: this.fechaCita,
          });
        }
        this.fechaCita = '';
      }
    },
    editarCita(idCita) {
      const cita = this.citas.find(cita => cita.id === idCita);
      if (cita) {
        this.tipoCita = cita.tipo.toLowerCase();
        this.fechaCita = cita.fecha;
        this.citaModificarId = idCita;
        this.editando = true;
      }
    },
    aceptarEdicion(idCita) {
      const index = this.citas.findIndex(cita => cita.id === idCita);
      if (index !== -1) {
        this.citas[index].tipo = this.tipoCita === 'entrenador' ? 'Entrenador' : 'Médico';
        this.citas[index].fecha = this.fechaCita;
        this.citaModificarId = null;
        this.editando = false;
      }
    },
    cancelarCita(idCita) {
      this.citas = this.citas.filter(cita => cita.id !== idCita);
      this.editando = false;
    },
    regresar() {
      
    },
  },
};
</script>

<style>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: #fff;
}

input[type="datetime-local"],
select {
  padding: 5px;
  font-size: 14px;
  margin-bottom: 10px;
}

.citas-content {
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