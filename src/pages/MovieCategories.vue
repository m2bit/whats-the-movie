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
      get_upcoming: 'GET_UPCOMING',
      get_searchmovie: 'GET_SEARCHMOVIE',
      get_wordsearch: 'GET_WORDSEARCH'
    }),

    loadCategories() {
      return this['get_' + this.category]
    },

    category () {
      return this.$route.params.category
    }
  },
  watch: {
    get_wordsearch (v) {
      console.log(v)
      this.AddWordsearch(v)
      this.listMovie()
    }
  },
  methods: {
    ...mapActions({
      LoadAllList: 'LOAD_ALL_LIST',
      LoadList: 'LOAD_LIST',
      AddWordsearch: 'ADD_WORDSEARCH',
      SearchMovie: 'SEARCH_MOVIE'
    }),

    listMovie () {
      console.log('quant.', this.get_wordsearch.length)
      if (this.$route.params.category === 'searchmovie') {
        console.log('Buscando novos movie: ', this.get_wordsearch)
        this.SearchMovie({
          movie: this.get_wordsearch
        })
      } else {
        this.LoadList({
          category: this.category
        })
      }
    }

  },
  mounted () {
    this.listMovie()
  }
}
</script>