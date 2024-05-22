<template>
  <div>
    <!-- Aquí mostrar los detalles de la rutina utilizando el ID recibido como prop -->
    <h2>Detalles de la rutina {{ id }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>