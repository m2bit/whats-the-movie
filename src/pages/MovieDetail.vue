<template>
  <v-container
    class="fill-width black"
    fluid
    style="min-height: 434px"
  >
    <v-fade-transition mode="out-in">
      <v-row v-if="show" key="0">
        <v-col md="4" 
          class="pl-2 white--text align-end"
          height="600px"
          style="position: relative;"
        >
          <div style="position: absolute; bottom: 10%; width:95%;" class="py-5">
            <h2 class="pa-4">{{ getMovie.title }}</h2>
            <h4 class="pa-4 my-5 opaqueBackground">{{ getMovie.tagline }}</h4>
          </div>
        </v-col>

        <v-col md="8">
          <v-card class="mx-auto" tile>
            <v-img
              :src="fullPath(getMovie.backdrop_path)"
              aspect-ratio="1.8"
            >
              <div class="lightbox" style="position: absolute; top: 0%; height:100%; width: 90%">
                <div class="row">
                  <div class="col-8 text-left"></div>
                </div>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <v-col md="12">
          <v-tabs v-model="tab"
            background-color=" transparent"
            color="white"
            slider-color="red"
            slider-size=4
            centered
          >
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" height="500px">
              
              <v-tab-item>
                <v-card dark tile flat height="300px">
                  <v-card-text>
                    {{ getMovie.overview }}
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card dark tile flat height="300px">
                  <v-card-text>
                    <p v-for="(pc, idPc) in getMovie.production_companies" :key="idPc" >
                      {{ pc.name }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card dark tile flat height="300px">
                  <v-card-text>
                    <p v-for="(genres, idGenres) in getMovie.genres" :key="idGenres" >
                      {{ genres.name }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card dark tile flat height="300px">
                  <v-card-text>
                    <p v-for="(pCountries, idPCountries) in getMovie.production_countries" :key="idPCountries" >
                      {{ pCountries.name }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-tab-item>

          </v-tabs-items>
          
        </v-col>
      </v-row>
    </v-fade-transition>
    <c-footpage></c-footpage>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import movieCategory from '@/mixins/movieCategory'
import CFootpage from '@/components/CFootpage'

export default {
  name: 'MovieDetail',
  mixins: [
    movieCategory
  ],
  components: {
    CFootpage
  },

  data() {
    return {
      tab: 'overview',
      show: true,
      items: [
        'Overview', 
        'Production Companies', 
        'Genres', 
        'Production Countries'
      ]
    }
  },

  computed: {
    ...mapGetters({
      getMovie: 'GET_MOVIE'
    })
  },

  methods: {
    ...mapActions({
      LoadMovie: 'LOAD_MOVIE'
    }),

    async loadIdMovie() {
      let id = this.$route.params.idMovie
      await this.LoadMovie(id)
    }

  },
  mounted () {
    this.loadIdMovie()
  }
}
</script>

<style lang="sass">
  .opaqueBackground
    background-color: rgba(177,177,177,0.2)

  .lightbox
    background-image: linear-gradient(to right, #000, #333 15%, transparent 50%)

  .basil
    background-color: #fff !important

  .basil--text
    color: #fff !important

  .theme--light.v-tabs 
    .v-tabs-bar 
    .v-tab:not(.v-tab--active)
        color: #ddd !important

</style>