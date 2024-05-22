<template>
  <div class="container">
    <header class="header">
      <navBarUsuario />
    </header>
  </div>
  <section>
    <div>
      <h2>Puntajes</h2>
      <ul>
        <li v-for="(usuario, index) in usuariosOrdenados" :key="usuario.uid"
          :style="{ color: currentUserUID ===  usuario.id ? 'red' : 'black' }">
          {{ index + 1 }}. {{ usuario.nombre }} - {{ usuario.puntaje }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import navBarUsuario from "@/components/navBarUsuario.vue";
import { useUserStore } from "../stores/user";
import { db, auth } from "../Firebase/index";
import { doc, getDoc, setDoc, collection, query, orderBy, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      currentUserUID: null,
      usuariosOrdenados: [],
    };
  },
  components: {
    navBarUsuario,
  },
  methods: {
    async cargarUsuariosOrdenados() {
      try {
        const usuariosRef = collection(db, 'Ranking');
        const q = query(usuariosRef, orderBy('puntaje', 'desc'));
        const querySnapshot = await getDocs(q);
        const usuariosOrdenados = querySnapshot.docs.map(doc => doc.data());
        this.usuariosOrdenados = usuariosOrdenados;
      } catch (error) {
        console.error('Error al cargar los usuarios ordenados:', error);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();
    const isLocalAdmin = userStore.isAdmin;
    next((vm) => {
      vm.isLocalAdmin = isLocalAdmin;
    });
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUID = user.uid;
        console.log("El usuario actual es ", this.currentUserUID);
        this.cargarUsuariosOrdenados();
      }
    });
  },
};
</script>

<style>
/* Estilos CSS */
</style>
