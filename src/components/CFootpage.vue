<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-divider></v-divider>
      <v-col
        class="dark lighten-2 py-5 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>&copy; What's the movie</strong>
      </v-col>
    </v-card>
  </v-footer>
</template>