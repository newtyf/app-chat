<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card class="text-center">
        <v-card-text>
          <v-avatar size="124" tile>
            <img
              :src="usuario.foto"
              alt="avatar"
              referrerpolicy="no-referrer"
              style="object-fit: cover"
            />
          </v-avatar>
        </v-card-text>
        <v-card-text>
          <h3>{{ usuario.nombre }}</h3>
        </v-card-text>
        <v-card-text v-if="file">
          <h4>{{ file.name }}</h4>
          <v-img :src="filePrev"></v-img>
        </v-card-text>
        <v-card-text v-if="error != ''">
          <h4>{{error}}</h4>
        </v-card-text>
        <v-card-text>
          <input
            type="file"
            ref="boton"
            class="d-none"
            @change="buscarImagen($event)"
          />

          <v-btn color="primary" @click="$refs.boton.click()" block
            >Buscar Imagen</v-btn
          >
          <v-btn
            color="secondary"
            :disabled="file == null"
            block
            @click="subirImagen"
            :loading="loading"
            >Subir Imagen</v-btn
          >
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { storage, firebase, db } from "../firebase";

export default {
  data: () => ({
    file: null,
    filePrev: "",
    loading: false,
    error: "",
  }),
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    buscarImagen(event) {
      const file = event.target.files[0];
      const isJpgOrPng =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png"
          ? true
          : false;

      if (!isJpgOrPng) {
        return (this.error = "Archivo no valido");
      } else [
        this.error = ''
      ]

      this.file = file;
      /* esta funcion me genera una url del archivo cargado para la previsualizcion * *  de este
       */
      // this.filePrev = URL.createObjectURL(event.target.files[0]);

      // OTRA FORMA DE VISUALIZAR LA IMAGEN
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        //console.log(e.target.result);
        this.filePrev = e.target.result;
      };
    },
    async subirImagen() {
      try {
        this.loading = true;
        // root reference
        const storageRef = storage.ref();

        // image reference
        const imagesRef = storageRef.child("perfil").child(this.usuario.uid);

        const res = await imagesRef.put(this.file);
        console.log(res);

        const urlDescarga = await imagesRef.getDownloadURL();

        this.usuario.foto = urlDescarga;

        await db.collection("users").doc(this.usuario.email).update({
          foto: urlDescarga,
        });

        this.file = null;

        console.log(urlDescarga);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
