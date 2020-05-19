<template>
    <c-show-all-movie-categories
      :category="category"
      :movies="loadCategories.results" 
      :page="loadCategories.page"
      :total-pages="loadCategories.total_pages"
    />
</template>

<script>

import CShowAllMovieCategories from '../components/CShowAllMovieCategories'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MovieCategories',
  components: {
    CShowAllMovieCategories
  },
  data () {
    return {
      movies: []
    }
  },
  computed: {
    ...mapGetters({
      get_toprated: 'GET_TOPRATED',
      get_nowplaying: 'GET_NOWPLAYING',
      get_popular: 'GET_POPULAR',
      get_upcoming: 'GET_UPCOMING'
    }),

    loadCategories() {
      console.log('get_' + this.category)
      return this['get_' + this.category]
    },

    category () {
      return this.$route.params.category
    }
  },
  methods: {
    ...mapActions({
      LoadAllList: 'LOAD_ALL_LIST',
      LoadList: 'LOAD_LIST'
    }),

    listMovie () {
      this.LoadList({
        category: this.category
      })
    }

  },
  mounted () {
    this.listMovie()
  }
}
</script>