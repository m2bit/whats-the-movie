<template>
  <v-card tile >
    <a :href="link">
    <v-img
      :src="image"
      class="white--text"
      height="35vh"
    >
    </v-img>
    </a>
  </v-card>
</template>

<script>
export default {
  name: 'CMovieCover',
  props: {
    image: {
      type: String,
      default: ''
    },
    id: {
      type: Number
    }
  },
  computed: {
    link () {
      return '/movie-detail/' + this.id
    }
  }
}
</script>