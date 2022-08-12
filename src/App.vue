<template>
  <v-app>
    <NavBar v-if="usuario != ''"></NavBar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapState(['usuario'])
  },
  components: {NavBar}
};
</script>
