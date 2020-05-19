import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const URI = {
  popular: 'movie/popular',
  nowplaying: 'movie/now_playing',
  upcoming: 'movie/upcoming',
  toprated: 'movie/top_rated',
  genres: 'genre/movie/list',
  search: '/search/movie',
  urlImage: 'https://image.tmdb.org/t/p/w500'
}

export default new Vuex.Store({
    state: {
      genres: [],
      popular: [],
      nowplaying: [],
      upcoming: [],
      toprated: [],
      searchMovie: [],
      urlImage: URI.urlImage,
      movie: []
    },
    getters: {
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

      GET_BIGGER_POPULARITY(state) {
        if(state.toprated.length !== 0) {
          let pontos = state.toprated.results.reduce((a,b) => Math.max(a,b.popularity), 0)
          let movie = state.toprated.results.filter(proc => proc.popularity === pontos)

          return movie[0]
        }
      },

      GET_NOWPLAYING(state) {
        return state.nowplaying
      },

      GET_UPCOMING(state) {
        return state.upcoming
      },

      GET_SEARCH_MOVIE(state) {
        return state.searchMovie
      },

      GET_MOVIE(state) {
        return state.movie
      }
    },

    mutations: {
      // SET_GENRES (state, payload) {
      //     state[payload.state] = payload.data.genres
      // },

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

      // Adiciona o resultado de uma pesquisa
      SET_SEARCH (state, movies) {
          state.searchMovie = movies.data
      }
    },

    actions: {
      // Carrega uma lista de acordo com a categoria 
      LOAD_LIST ({commit}, {category, params}) {
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
      },

      // Carrega varias categorias
      LOAD_ALL_LIST({dispatch}, ListMovieCategories) {
        ListMovieCategories.map(category => {
          dispatch('LOAD_LIST', {category: category})
        })
      },

      // Adiciona proxima pagina de categoria
      ADD_LIST_MOVIE({dispatch}, {category, page}) {
        const params = {
          page: (page + 1)
        }
        dispatch('LOAD_LIST', {category: category, params: params})
      },

      // Carregar somente um filme
      LOAD_MOVIE({commit}, idMovie) {
        Vue.prototype.$http
        .get('movie/' + idMovie)
        .then(dataList => {
            commit('SET_CATEGORY', {
              data: dataList.data,
              state: 'movie'
            })
        })
        .catch(error => {
          console.log(error)
        })
      },

      // Procura um filme
      SEARCH_MOVIE ({commit}, movie) {
        const params = {
            query: movie
        }

        Vue.prototype.$http
          .get(URI.search, { params })
          .then(dataMovieList => {
              commit('SET_SEARCH', dataMovieList)
          })
      }
    }
})