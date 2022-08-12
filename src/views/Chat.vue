<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3>Bienvenido {{ usuario.nombre }}</h3>
        </v-card-text>
        <v-card-text>
          <div class="text-right">
            <v-chip pill>
              mensaje de chat
              <v-avatar right pill>
                <img :src="usuario.foto" />
              </v-avatar>
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>

<style></style>
