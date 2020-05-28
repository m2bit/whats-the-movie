<template>
  <div>
    <v-container
      id="scroll-target"
      class="overflow-y-auto"
    >
      <v-row v-scroll:#scroll-target="onScroll"
        style="height: 100vh"
        justify="center"
        class="no-gutters">
        <div class="col-md-2 col-xs-12 col-sm-3 mb-4" v-for="(movie, index) in movies" :key="index">
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
      updateList: 0,
      canUpdate: false,
      incUpdateList: 0
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

  watch: {
    page (v) {
      console.log(v)
      if (v === 1) {
        console.log('Entrou...')
        this.initData()
      }
    }
  },

  methods: {
    ...mapActions({
      AddListMovie: 'ADD_LIST_MOVIE'
    }),

    initData () {
      this.offsetTop = 0
      this.updateList = 200
      this.canUpdate = true
      this.incUpdateList = 200
      this.scrollToTop()
    },

    scrollToTop () {
      let container = document.getElementById('scroll-target')
      container.scrollTop = 0
    },

    async onScroll (e) {
      this.offsetTop = e.target.scrollTop
      if (this.canUpdate && this.offsetTop > this.updateList) {
        console.log('Entrou no onScroll')
        this.canUpdate = false
        await this.AddListMovie({
          category: this.category,
          page: this.page
        })
        this.updateList += this.incUpdateList
        this.canUpdate = true
      }
    }
  },

  mounted () {
    this.initData()
  }

}
</script>

<style lang="sass">
  .container
    max-width: 100%
</style>