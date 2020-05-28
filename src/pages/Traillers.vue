<template>
  <div class="row" style="height: calc(100vh - 70px)">
    <v-container fluid>
    <v-row align="center" justify="center">
      <div class="col-md-6 col-xs-12 px-5" red justify-content="center">
        <v-select
          :items="listMovieVideos"
          v-model="videoId"
          label="Choice video"
          dark
          :full-width="false"
        />
      </div>
    </v-row>
    <v-row align="center" justify="center">
        <youtube v-if="videoId" :video-id="videoId" ref="youtube" @playing="playing"></youtube>
    </v-row>

  </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import { mapGetters } from 'vuex'

Vue.use(VueYoutube)

export default {
  data() {
    return {
      videoId: ''
    }
  },

  mounted() {
    console.log(this.getMovieVideos)
  },

  computed: {
    ...mapGetters({
      getMovieVideos: 'GET_MOVIEVIDEOS'
    }),

    listMovieVideos () {
      if (this.getMovieVideos.results.length > 0 ) {
        return this.getMovieVideos.results.map(v => {
          return { 
            text:  v.name, 
            value: v.key
          }
        })
      }
      return ''
    },

    player() {
      return this.$refs.youtube.player
    }
    
  },

  methods: {
    async playVideo() {
      await this.player.playVideo()
    },

    playing() {
      console.log('we are watching!!!')
    }
  }
}
</script>

<style lang="sass">
  .theme--light.v-list 
    background: black
    color: white

</style>