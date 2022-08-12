<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3>Bienvenido {{ usuario.nombre }}</h3>
        </v-card-text>
        <v-card-text style="height: 64vh; overflow: scroll; overflow-x: hidden;e" v-chat-scroll>
          <div
            :class="item.usuarioId === usuario.uid ? 'text-right' : 'text-left'"
            v-for="(item, index) in mensajes"
            :key="index"
          >
          <span class="mr-2">{{item.nombre}}</span>
            <v-chip pill>
              <span v-if="item.usuarioId == usuario.uid">{{ item.message }}</span>
              <v-avatar :right="item.usuarioId === usuario.uid ? true : false" :left="item.usuarioId === usuario.uid ? false : true">
                <img referrerpolicy="no-referrer" :src="item.foto" style="object-fit: cover" />
              </v-avatar>
              <span v-if="item.usuarioId !== usuario.uid">{{ item.message }}</span>
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
          usuarioId: this.usuario.uid
      }
      if (this.valido) {
        const fechaAhora = Date.now()
        db.collection("chats").doc(fechaAhora.toString()).set(mensajeToSend)
          .catch((error) => {
            console.log(error);
          })
          this.mensaje = ''
      } else {
        console.log('no se envio');
      }
    },
  },
  created() {
    moment.locale("es");

    let ref = db.collection("chats").orderBy('fecha', 'desc').limit(10)

    ref.onSnapshot((querySnapshot) => {
      this.mensajes = [];

      querySnapshot.forEach((doc) => {
        this.mensajes.unshift({
          ...doc.data(),
          fecha: moment(doc.data().fecha).format("lll"),
        });
      });

      console.log(this.mensajes);
    });
  },
};
</script>

<style></style>
