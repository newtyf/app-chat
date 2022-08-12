<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-btn text>vue</v-btn>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="closeSession">
        <span class="mr-2">Cerrar Sesion</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="indigo" app>
      <v-layout column align-center mt-5>
        <v-flex>
          <v-avatar size="120">
            <img :src="usuario.foto" alt="avatar" referrerpolicy=“no-referrer” style="object-fit: cover" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="mt-3 white--text">{{ usuario.nombre }}</p>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-list v-for="(item, index) in items" :key="index">
        <v-list-item link :to="item.to">
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { auth } from "@/firebase";
import router from "@/router";
export default {
  name: "NavBar",

  data: () => ({
    drawer: true,
    items: [
      { title: "Perfil", icon: "fas fa-id-card", to: { name: "Home" } },
      { title: "Adminstracion", icon: "fas fa-user-cog", to: { name: "Admin" } },
      { title: "Chat", icon: "fas fa-comment-alt", to: { name: "Chat" } },
    ],
  }),
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    ...mapMutations(["newUser"]),
    async closeSession() {
      router.push({ name: "Ingreso" });
      await auth.signOut();
      this.newUser(null);
      console.log("sesion cerrada");
    },
  },
};
</script>

<style></style>
