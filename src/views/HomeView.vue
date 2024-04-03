<template>
  <div>
    <header>
      <h1 class="texts__title">Inicio Usuario</h1>
    </header>

    <!-- Anuncio de rutinas -->
    <section class="announcement">
      <h2 class="texts__title2">Rutinas</h2>
      <div class="announcement__grid">
        <!-- Recuadros de rutinas -->
        <div class="announcement__item">Rutina 1</div>
        <div class="announcement__item">Rutina 2</div>
        <div class="announcement__item">Rutina 3</div>
        <div class="announcement__item">Rutina 4</div>
      </div>
    </section>

    <!-- Anuncio de dietas -->
    <section class="announcement">
      <h2 class="texts__title2">Dietas</h2>
      <div class="announcement__grid">
        <!-- Recuadros de dietas -->
        <div class="announcement__item">Dieta 1</div>
        <div class="announcement__item">Dieta 2</div>
        <div class="announcement__item">Dieta 3</div>
        <div class="announcement__item">Dieta 4</div>
      </div>
    </section>

    <section class="buttons">
    <router-link class="buttons__btn buttons__btn--login" to="/login"
      >Login</router-link
    >

    <router-link class="buttons__btn buttons__btn--register" to="/register"
      >Register</router-link
    >
  </section>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style scoped>
header {
  width: 100%;
  background-color: #157dcc;
  text-align: center;
  margin-bottom: 50px;
}

.texts {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.texts__title {
  font-size: 3.5rem;
}

.texts__title2 {
  font-size: 2.5rem;
  padding-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  padding-top: 100px;
}

.buttons__btn {
  text-decoration: none;
  padding: 1.3em 3em;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  background-color: #282828;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.buttons__btn--login:hover {
  background-color: #27ca89;
  box-shadow: 0px 15px 20px rgba(41, 207, 141, 0.4);
  transform: translateY(-7px);
}

.buttons__btn--register:hover {
  background-color: #f53131;
  box-shadow: 0px 15px 20px rgba(229, 46, 46, 0.4);
  transform: translateY(-7px);
}

.buttons__btn:active {
  transform: translateY(-1px);
}

.announcement {
  margin-bottom: 20px;
}

.announcement__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.announcement__item {
  background-color: #f0f0f0;
  padding: 80px;
  border-radius: 15px;
}
</style>
