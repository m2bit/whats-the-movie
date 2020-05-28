<template>
  <c-tabs :vertical="!isMobile" :centered="true" class="tabsColor" :tabs="tabs">
    <template v-slot:tab1>
      <div class="col-12">
          <div class="row no-gutters">

            <div class="col-12 title">
              <strong>Cast</strong>
            </div>

            <v-container fluid class="overflow-y-auto" style="height: calc(100vh - 150px)">
              <v-layout row>
                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" v-for="(cast, index) in creditsCast" :key="index">
                  <div class="row no-gutters pa-1">
                    <div class="col-5">
                      <v-img :src="getImage(cast.profile_path)" />
                    </div>
                    <div class="col-7 no-gutters mt-1 pl-1" >
                      <div class="col-12" style="font-size: 0.8em">
                        <strong>{{cast.name}}</strong>
                      </div>
                      <div class="col-12" style="font-size: 0.7em">
                        <strong>{{cast.character}}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </v-layout>
            </v-container>

          </div>        
        </div>
    </template>
    
    <template v-slot:tab2>
      <div class="col-12">
          <div class="row no-gutters">

            <div class="col-12 title">
              <strong>Crew</strong>
            </div>

            <v-container fluid class="overflow-y-auto" style="height: calc(100vh - 150px)">
              <v-layout row>
                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" v-for="(crew, index) in creditsCrew" :key="index">
                  <div class="row no-gutters pa-1">
                    <div class="col-5">
                      <v-img :src="getImage(crew.profile_path)" />
                    </div>
                    <div class="col-7 no-gutters mt-1 pl-1" >
                      <div class="col-12" style="font-size: 0.9em">
                        <strong>{{ crew.name }}</strong>
                      </div>
                      <div class="col-12" style="font-size: 0.7em">
                        {{ crew.department }}
                      </div>
                      <div class="col-12" style="font-size: 0.6em">
                        <strong>{{ crew.job }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </v-layout>
            </v-container>

          </div>        
        </div>
    </template>  
  </c-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
import CTabs from '../components/CTabs'

export default {
  components: {
    CTabs
  },
  data () {
    return {
      tabs: [
        'Cast',
        'Crew'
      ],
      pathImage: 'https://image.tmdb.org/t/p/w300'
    }
  },
  computed: {
    ...mapGetters({
      getMovieCredits: 'GET_MOVIECREDITS'
    }),

    creditsCast () {

      if (this.getMovieCredits.cast.length > 0) {
        return this.getMovieCredits.cast
      }

      return ''
    },

    creditsCrew () {
      if (this.getMovieCredits.crew.length > 0) {
        return this.getMovieCredits.crew
      }

      return ''
    },

    isMobile () {
      return window.innerWidth <= 768
    }
  },

  methods: {
    getImage(image) {
      if (image) {
         return this.pathImage + image
      } else {
        return ''
      }
    }
  },

  mounted () {
    console.log(this.getMovieCredits)
  }
}
</script>

<style lang="sass">
  .tabsColor
    .v-tabs--vertical > .v-tabs-bar .v-tabs-bar__content
      background: #B0BEC5
      background-image: linear-gradient(to right, #B0BEC5 90%, #000)

    .v-tabs-bar .v-tabs-bar__content
      background: #B0BEC5
      background-image: linear-gradient(to top, #B0BEC5 90%, #000)

      
</style>