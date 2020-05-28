<template>
  <v-card tile dark class="overflow-hidden">
    <v-bottom-navigation
        scroll-target="#scroll-area-1"
        :value="1"
        class="py-2"
      >

        <v-toolbar-title class="mt-2 ml-2 mr-2 grey--text d-none d-md-flex">
          <span>What's the Movie</span>
        </v-toolbar-title>

      
        <v-btn to="/">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/statistic-page">
          <span>Statistic</span>
          <v-icon>mdi-chart-areaspline</v-icon>
        </v-btn>
        
        <v-spacer></v-spacer>

        <v-flex xs12 sm6 md4> 
          <v-text-field 
            class="mt-1 mr-2" filled rounded 
            clearable
            placeholder="Titles, people, genres"
            v-model="search"
            @keyup="searchMovie"
            @click:clear="getClearable">
            <v-icon slot="append" color="white">mdi-magnify</v-icon>
          </v-text-field>
        </v-flex>
        
      </v-bottom-navigation>

      <v-spacer></v-spacer>

    <v-sheet id="scroll-area-1" class="overflow-y-auto" tile max-height="calc(100vh - 70px)">
      <slot></slot>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CAppBar',
  data: () => ({
    canHideOnScroll: false,
    bottomNav: 3,
    search: '',
    timer: null
  }),

  methods: {
    ...mapActions({
      AddWordsearch: 'ADD_WORDSEARCH'
    }),
    openSearch () {
      this.isOpenSearch = !this.isOpenSearch
    },

    getClearable () {
      if (this.timer === null) {
        this.$router.go(-1)
      }
    },

    searchMovie () {  
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.timer = setTimeout(() => {
        if(this.search) {
          this.AddWordsearch(this.search)
        }

        if (this.$route.params.category !== 'searchmovie') {
          this.$router.push({ name: 'movie-categories', params: {category: 'searchmovie'} })
        }
        this.timer = null
      }, 800)
    }
  }
}

</script>

<style lang="sass" >
  .v-text-field--filled > .v-input__control > .v-input__slot
    min-height: 35px !important

  .v-input__append-inner
    margin-top: 5px !important

  .v-item-group.v-bottom-navigation .v-btn 
    height: -webkit-fill-available !important

</style>
