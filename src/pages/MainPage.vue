<template>
    <div>
      <c-show-newcoming
        :image="image"
        :title="title"
        :description="description"
      ></c-show-newcoming>

      <c-show-movie-categories
        :movies=getTopRated.results
        category="Top Rated"
      ></c-show-movie-categories>

      <c-show-movie-categories
        :movies=getNowPlaying.results
        category="Now Playing"
      ></c-show-movie-categories>

      <c-show-movie-categories
        :movies=getPopular.results
        category="Popular"
      ></c-show-movie-categories>

      <c-show-movie-categories
        :movies=getUpcoming.results
        category="Upcoming"
      ></c-show-movie-categories>

      <c-footpage />

    </div>
</template>

<script>

import CShowNewcoming from '@/components/CShowNewcoming'
import CShowMovieCategories from '@/components/CShowMovieCategories'
import CFootpage from '@/components/CFootpage'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    CShowNewcoming,
    CShowMovieCategories,
    CFootpage
  },
  computed: {
    ...mapGetters({
      getTopRated: 'GET_TOPRATED',
      getNowPlaying: 'GET_NOWPLAYING',
      getPopular: 'GET_POPULAR',
      getUpcoming: 'GET_UPCOMING',
      getBiggerPopularity: 'GET_BIGGER_POPULARITY'
    }),

    image () {
      return this.getBiggerPopularity 
        ? this.getBiggerPopularity.backdrop_path
        : ''
    },

    title () {
      return this.getBiggerPopularity 
        ? this.getBiggerPopularity.original_title
        : ''
    },

    description () {
      return this.getBiggerPopularity 
        ? this.getBiggerPopularity.overview
        : ''
    },
    
  },
  methods: {
    ...mapActions({
      LoadAllList: 'LOAD_ALL_LIST'
    }),

    listMovie () {
      this.LoadAllList([
        'toprated',
        'nowplaying',
        'popular',
        'upcoming'
      ])
    }

  },
  mounted () {
    this.listMovie()
  }
}
</script>