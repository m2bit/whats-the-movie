<template>
  <div>
    <v-container
      id="scroll-target"
      style="height: 100%;"
      class="overflow-y-auto"
    >
      <v-row v-scroll:#scroll-target="onScroll"
        justify="center"
        style="height: 100vh">
        <div class="col-2" v-for="(movie, index) in movies" :key="index">
          <c-movie-cover :id="movie.id" :image="fullPath(movie.poster_path)" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import CMovieCover from '@/components/CMovieCover'
import movieCategory from '@/mixins/movieCategory'
import { mapActions } from 'vuex'

export default {
  name: 'CShowAllMovieCategories',
  mixins: [
    movieCategory
  ],
  components: {
    CMovieCover
  },

  data () {
    return {
      offsetTop: 0,
      updateList: 200,
      canUpdate: true,
      incUpdateList: 200
    }
  },

  props: {
    category: {
      type: String
    },
    movies: {
      type: Array
    },
    page: {
      type: Number
    },
    totalPages: {
      type: Number
    }
  },

  methods: {
    ...mapActions({
      AddListMovie: 'ADD_LIST_MOVIE'
    }),

    async onScroll (e) {
      this.offsetTop = e.target.scrollTop
      if (this.canUpdate && this.offsetTop > this.updateList) {
        this.canUpdate = false
        await this.AddListMovie({
          category: this.category,
          page: this.page
        })
        this.updateList += this.incUpdateList
        this.canUpdate = true
      }
    }
  }

}
</script>

<style lang="sass">
  .container
    max-width: 100%
</style>