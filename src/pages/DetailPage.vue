<template>
  <v-container fluid style="height: calc(100vh - 140px)" class="overflow-y-auto">
    <div class="row no-gutters" style="position: relative">

      <div class="col-md-3 col-xs-12" style="z-index:1000">
        <div class="col-12">
          <span class="title font-weight-bold">{{ dataMovie.title }}</span>
        </div>
        
        <div class="col-12 d-none d-sm-flex">
          <span class="subtitle-1">{{ dataMovie.release_date }}</span>
        </div>

        <div class="col-12">
          <span class="font-weight-bold yellow--text">
            {{ dataMovie.vote_average * 10 }} % Match
          </span>
          - {{ dataMovie.runtime }} min
        </div>

        <div class="col-12 d-none d-sm-flex">
          <span class="caption ">{{ dataMovie.overview }}</span>
        </div>

        <div class="col-12 subtitle-2 d-none d-sm-flex">
          <div class="row">
            <div class="col-12">
              Starring: 
              <strong>{{ cast }}</strong>
            </div>
            <div class="col-12">
              Genres: 
              <strong>{{ genres }} </strong>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 col-xs-12" aspect-ratio="1.778" style="padding: 0px">
        <v-img aspect-ratio="1.778" contain 
          :src="fullPath(dataMovie.backdrop_path)" />
      </div>
      <div class="col-md-4 col-xs-12 itemTransparent d-none d-md-flex" style="z-index:9"></div>
      <div class="py-2 px-4 certificationMovie white--text">
        13 +
      </div>
    </div>
    
  </v-container>
</template>

<script>
import movieCategory from '@/mixins/movieCategory'
import { mapGetters, mapActions} from 'vuex'
export default {
  name: 'DetailPage',
  mixins: [
    movieCategory
  ],
  computed: {
    ...mapGetters({
      getMovie: 'GET_MOVIE',
      getMovieCredits: 'GET_MOVIECREDITS'
    }),

    dataMovie () {
      return this.getMovie
    },

    genres () {
      return this.dataMovie.length !== 0 
        ? this.dataMovie.genres.map(n => n.name).join(', ') 
        : ''
    },

    cast () {
      console.log('cast: ', this.getMovieCredits)
      return this.getMovieCredits.length !== 0
        ? this.getMovieCredits.cast.map(n => n.name).slice(0, 5).join(', ')
        : ''
    }

  },

  methods: {
    ...mapActions({
      loadMovie: 'LOAD_MOVIE'
    }),

    async getMovieAll () {
      let idMovie = this.$route.params.idMovie
      await this.loadMovie({idMovie: idMovie})
      await this.loadMovie({idMovie: idMovie, detail: 'credits'})
      await this.loadMovie({idMovie: idMovie, detail: 'videos'})
      await this.loadMovie({idMovie: idMovie, detail: 'similar'})
    }

  },

  created () {
    this.getMovieAll()
  },

}
</script>

<style lang="sass">
  .itemTransparent
    position: absolute
    height:100vh
    background-image: linear-gradient(to right, black 50%, #000, transparent)

  .certificationMovie
    position: absolute
    bottom: 44px
    right:0px
    background: #000000
    opacity: 0.5
    padding: 0px
    border-left: solid #fff 6px
    border-radius: 5px 0% 0% 5px
    width: 90px
</style>