<template>
  <v-carousel 
    height=390px
    hide-delimiters
    class="px-4"
  >

    <v-hover class="my-2" v-slot:default="{ hover }">
        <v-btn :to="slug" text>
          <strong>{{ category }}</strong>
          <v-layout>
            <v-flex shrink>
              <v-expand-x-transition>
                <div class="pl-6" v-if="hover" style="white-space: nowrap">
                    <strong>Show all ></strong>
                </div>
              </v-expand-x-transition>
            </v-flex>
          </v-layout>
        </v-btn>
    </v-hover>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
      v-for="(chunk, idChunk) in chunkMovies" :key=idChunk
    >
      <div class="row no-gutters">
        <div class="col-md-2 col-xs-12 col-sm-3" v-for="(movie, idMovie) in chunk" :key=idMovie>
          <c-movie-cover :id="movie.id" :image="fullPath(movie.poster_path)"></c-movie-cover>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import CMovieCover from '@/components/CMovieCover'
import movieCategory from '@/mixins/movieCategory'

export default {
  name: 'CShowMovieCategories',
  mixins: [
    movieCategory
  ],
  components: {
    CMovieCover
  },
  props: {
    movies: {
      type: Array
    },
    category: {
      type: String
    }
  },
  computed: {
    chunkMovies () {
      if (this.movies) {
        const amountChunk = this.screenSize
        const chunk = []
        for (let i=0; i<this.movies.length; i+=amountChunk) {
          chunk.push(this.movies.slice(i, i + amountChunk))
        }
        return chunk
      }
      
      return []
    },
    screenSize () {
      let size = window.innerWidth
      if (size < 600) {
        return 1
      } else if (size < 960) {
        return 4
      } else {
        return 6
      }
    },

    slug () {
      return '/movie-categories/' + this.category.toLocaleLowerCase().replace(' ', '')
    }
  }
}
</script>
