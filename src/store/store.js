import Vue from 'vue'
import Vuex from 'vuex'
import { URI } from './constsUri'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      loading: false,
      genres: [],
      popular: [],
      nowplaying: [],
      upcoming: [],
      toprated: [],
      wordsearch: ' ',
      searchmovie: [],
      urlImage: URI.urlImage,
      movie: [],
      movievideos: [],
      credits: [],
      videos: [],
      similar: []
    },
    getters: {

      GET_LOADING(state) {
        return state.loading
      },

      GET_URLIMAGE(state) {
        return state.urlImage
      },

      GET_GENRES(state) {
        return state.genres
      },

      GET_POPULAR(state) {
        return state.popular
      },

      GET_TOPRATED(state) {
        return state.toprated
      },

      GET_NOWPLAYING(state) {
        return state.nowplaying
      },

      GET_UPCOMING(state) {
        return state.upcoming
      },

      GET_BIGGER_POPULARITY(state) {
        if(state.toprated.length !== 0) {
          let pontos = state.toprated.results.reduce((a,b) => Math.max(a,b.popularity), 0)
          let movie = state.toprated.results.filter(proc => proc.popularity === pontos)

          return movie[0]
        }
      },

      // Retorna o movie
      GET_MOVIE(state) {
        console.log('GETTERS: ', state.movie)
        return state.movie
      },

      // Retorna os creditos do filme especifico
      GET_MOVIECREDITS(state) {
        return state.credits
      },

      // Retorna os videos do filme especifico
      GET_MOVIEVIDEOS(state) {
        return state.videos
      },

      // Retorna os filmes similiar do filme especifico
      GET_MOVIESIMILAR(state) {
        return state.similar
      },

      // Buscando o resultado da pesquisa dos filmes
      GET_SEARCHMOVIE(state) {
        return state.searchmovie
      },

      // Palavra que sera pesquisa
      GET_WORDSEARCH(state) {
        return state.wordsearch
      },

      GET_RATED (state) {
        return state.toprated
      }
    },

    mutations: {

      // Adiciona a uma categoria e suas proximas paginas
      SET_CATEGORY (state, payload) {
        if ( state[payload.state].length === 0 ) {
          state[payload.state] = payload.data
        } else if ( payload.data.page > state[payload.state].page ) {
          state[payload.state] = { 
            results: state[payload.state].results.concat(...payload.data.results),
            page: payload.data.page,
            total_pages: payload.data.total_pages,
            total_results: payload.data.total_results,
          }
        }
      },

      SET_LOADING (state, canLoading) {
        state.loading = canLoading
      },

      // Adicionar a palavra que sera procurada
      SET_WORDSEARCH (state, word) {
        state.searchmovie = []
        state.wordsearch = word
      },

      SET_MOVIE (state, payload) {
        if (payload.detail === undefined) {
          state.movie = payload.data
        } else {
          state[payload.detail] = payload.data
        }
      }
    },

    actions: {
      // Carrega uma lista de acordo com a categoria 
      LOAD_LIST ({commit}, {category, params}) {
        commit('SET_LOADING', true)
        Vue.prototype.$http
          .get(URI[category], { params } )
          .then(dataList => {
              commit('SET_CATEGORY', {
                data: dataList.data,
                state: category
              })
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            commit('SET_LOADING', false)
          })
      },

      // Carrega varias categorias
      LOAD_ALL_LIST({dispatch}, ListMovieCategories) {
        ListMovieCategories.map(category => {
          dispatch('LOAD_LIST', {category: category})
        })
      },

      // Adiciona proxima pagina de categoria
      ADD_LIST_MOVIE({dispatch, state}, { category, page }) {
        
        const params = {
          page: (page + 1)
        }

        if (category === 'searchmovie') {
          dispatch('SEARCH_MOVIE', {
            movie: state.wordsearch,
            page: params.page
          })
        } else {
          dispatch('LOAD_LIST', {
            category: category, 
            params: params
          })
        }
        
      },

      // Carregar somente um filme
      async LOAD_MOVIE({commit}, {idMovie, detail}) {
        let url = detail === undefined 
          ? idMovie
          : `${idMovie}/${detail}`

        await Vue.prototype.$http
        .get('movie/' + url)
        .then(dataList => {
            commit('SET_MOVIE', {
              data: dataList.data,
              detail: detail
            })
        })
        .catch(error => {
          console.log(error)
        })
      },


      ADD_WORDSEARCH ({commit}, word) {
        commit('SET_WORDSEARCH', word)
      },

      // Procura um filme
      SEARCH_MOVIE ({ commit }, { movie, page }) {

        const params = {
            query: movie,
            page: page ?? 1
        }

        Vue.prototype.$http
          .get(URI.searchmovie, { params: params })
          .then(dataMovieList => {
              commit('SET_CATEGORY', {
                data: dataMovieList.data,
                state: 'searchmovie'
              })
          })
      }
    }
})