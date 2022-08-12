import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: '',
  },
  mutations: {
    newUser(state, payload) {
      if (payload === null) {
        state.usuario = ''
      } else {
        state.usuario = payload;
      }
    },
  },
  actions: {
    async setUser({ commit }, user) {
      try {
        const doc = await db.collection("users").doc(user.email).get();
        if (doc.exists) {
          commit("newUser", doc.data());
        } else {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL,
          };
          // Guardar en firestore
          await db.collection("users").doc(usuario.email).set(usuario);
          console.log("Usuario guardado en DB");
          commit("newUser", usuario);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
