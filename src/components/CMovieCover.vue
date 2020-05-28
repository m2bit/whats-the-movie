<template>
    <a :href="link">
      <v-img
        :src="image"
        contain
        class="white--text"
        :aspect-ratio="0.9/1.2"
      >
    </v-img>
    </a>
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