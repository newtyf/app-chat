<template>
  <v-layout column>
    <h1>Hola {{ usuario.nombre }}</h1>
    <img
      id="avatar-home"
      :src="usuario.foto"
      alt="foto"
      referrerpolicy="“no-referrer”"
      width="100%"
    />
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapState(["usuario"]),
  },
  components: {},
  mounted() {
    const avatar = document.getElementById("avatar-home");
    console.log(avatar);
    avatar.addEventListener("load", () => {
      this.loading = false;
    });
  },
};
</script>
