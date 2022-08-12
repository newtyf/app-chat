<template>
  <v-layout justify-center mt-4>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text
          class="display-1 text-uppercase white--text text-sm-center"
          :class="registro ? 'success' : 'primary'"
        >
          <span v-if="!registro">Ingreso</span>
          <span v-else>Registro</span>
        </v-card-text>

        <v-card-text class="text-uppercase white--text text-sm-center">
          <v-btn
            @click="google"
            color="error"
            block
            style="margin-bottom: 10px"
          >
            <v-icon left dark>fab fa-google</v-icon>Google</v-btn
          >
          <v-btn @click="facebook" color="info" block>
            <v-icon left dark>fab fa-facebook</v-icon>Facebook</v-btn
          >
        </v-card-text>

        <v-card-text>
          <v-btn block @click="registro = !registro">
            <span v-if="!registro"> No tienes cuenta registrate? </span>
            <span v-else> Ya tienes cuenta? </span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebase, auth, db } from "../firebase";
import { mapActions, mapMutations } from "vuex";
import router from "../router";

export default {
  name: "Ingreso",
  data: () => ({
    registro: false,
  }),
  methods: {
    ...mapActions(["setUser"]),
    google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();

      this.ingresar(provider);
    },
    facebook() {
      console.log("facebook");
      const provider = new firebase.auth.FacebookAuthProvider();

      this.ingresar(provider);
    },
    async ingresar(provider) {
      firebase.auth().languageCode = "pt";

      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        /**
         * Este codigo es para login pero sin popup y con redireccionamiento
         */
        // const result = await firebase.auth().signInWithRedirect(provider);
        // const res = await firebase.auth().getRedirectResult()
        // const user = res.user;
        this.setUser(user);

        router.push({ name: "Home" });
        console.log(user);
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
