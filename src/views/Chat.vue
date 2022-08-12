<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3>Bienvenido {{ usuario.nombre }}</h3>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text
          style="height: 64vh; overflow: scroll; overflow-x: hidden;e"
          v-chat-scroll
        >
          <div class="text-center">
            <v-btn
              small
              color="primary"
              @click="loadMessages"
              :loading="loading"
              v-if="!disabled"
            >
              Cargar mas mensajes
            </v-btn>
            <span v-if="disabled">Ya no hay mas mensajes</span>
          </div>
          <div
            :class="item.usuarioId === usuario.uid ? 'text-right' : 'text-left'"
            v-for="(item, index) in mensajes"
            :key="index"
          >
            <p class="mr-2 mb-0">{{ item.nombre }}</p>
            <v-chip pill>
              <span v-if="item.usuarioId == usuario.uid">{{
                item.message
              }}</span>
              <v-avatar
                :right="item.usuarioId === usuario.uid ? true : false"
                :left="item.usuarioId === usuario.uid ? false : true"
              >
                <img
                  referrerpolicy="no-referrer"
                  :src="item.foto"
                  style="object-fit: cover"
                />
              </v-avatar>
              <span v-if="item.usuarioId !== usuario.uid">{{
                item.message
              }}</span>
            </v-chip>
            <p class="caption mr-1">{{ item.fecha }}</p>
          </div>
        </v-card-text>

        <v-card-text>
          <v-form @submit.prevent="sendMessage" v-model="valido">
            <v-text-field
              v-model="mensaje"
              :rules="messageRules"
              label="Escribe tu mensaje aqui"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { db } from "../firebase";

export default {
  data: () => ({
    mensaje: "",
    messageRules: [(v) => !!v || "Tienes que escribir un mensaje"],
    valido: false,
    mensajes: [],
    pagination: null,
    loading: false,
    disabled: false,
  }),
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    async sendMessage() {
      const mensajeToSend = {
        message: this.mensaje,
        nombre: this.usuario.nombre,
        foto: this.usuario.foto,
        fecha: Date.now(),
        usuarioId: this.usuario.uid,
      };
      if (this.valido) {
        const fechaAhora = Date.now();
        db.collection("chats")
          .doc(fechaAhora.toString())
          .set(mensajeToSend)
          .catch((error) => {
            console.log(error);
          });
        this.mensaje = "";
      } else {
        console.log("no se envio");
      }
    },
    loadMessages() {
      this.loading = true;
      this.pagination.get().then((documentSnapshots) => {
        // Get the last visible document
        var lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // Construct a new query starting at this document,
        // get the next 25 cities.
        var next = db
          .collection("chats")
          .orderBy("fecha", "desc")
          .startAfter(lastVisible)
          .limit(10);
        next.onSnapshot((querySnapshot) => {
          if (querySnapshot.docs.length != 0) {
            console.log("hay mensajes");
            querySnapshot.forEach((doc) => {
              this.mensajes.unshift({
                ...doc.data(),
                fecha: moment(doc.data().fecha).format("lll"),
              });
            });
            this.pagination = next;
          } else {
            console.log("no hay mas mensajes");
            this.disabled = true;
          }
        });
        this.loading = false;
      });
    },
  },
  created() {
    moment.locale("es");

    let ref = db.collection("chats").orderBy("fecha", "desc").limit(10);

    ref.onSnapshot((querySnapshot) => {
      this.mensajes = [];
      this.disabled = false;
      this.pagination = ref;

      querySnapshot.forEach((doc) => {
        this.mensajes.unshift({
          ...doc.data(),
          fecha: moment(doc.data().fecha).format("lll"),
        });
      });
    });
  },
};
</script>

<style></style>
