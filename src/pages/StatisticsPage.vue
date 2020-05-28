<template>
  <div>
    <div v-if="!canMountChart" class="black d-flex align-center justify-center" style="height: calc(100vh - 70px) ">
      <v-progress-circular  :size="50" color="primary" indeterminate>Load</v-progress-circular>
    </div>
    
    <div v-else style="position: relative">
      <c-chart 
        nameChart="chart01"
        :data="dataset" 
        :svg-width="800" 
        :svg-height="400"
        labelX="order"
        labelY="vote_average"
        labelLegend="title"
        labelAxisX="Movies in order of user rating"
        labelAxisY="Rating"
        :setYScale="[0, 10]"
        @onMouseover="onMouseover" />

      <c-chart 
        nameChart="chart02"
        :data="dataset" 
        :svg-width="800" 
        :svg-height="400"
        labelX="order"
        labelY="vote_count"
        labelLegend="title"
        labelAxisX="Movies in order of vote count"
        labelAxisY="Vote count"
        :setYScale="[0, maxVoteCount]"
        @onMouseover="onMouseover" />

      <v-responsive v-if=showMovie
        class="d-none d-sm-flex"
        :style="{top: showMovie.positionTop}"
        style="position: absolute; z-index: 1000; left: 82vw; width: 10%">
        <c-movie-cover :id="showMovie.id" :image="fullPath(showMovie.poster_path)" />
        <div class="text-center" style="font-size: 1.2vw">
          <strong>{{ showMovie.info }}</strong>
        </div>
      </v-responsive>
    </div>

  </div>
</template>

<script>
import CChart from '@/components/CChart'
import { mapGetters, mapActions } from 'vuex'
import movieCategory from '@/mixins/movieCategory'
import CMovieCover from '@/components/CMovieCover'

export default {
  name: 'StatistcsPage',
  mixins: [
    movieCategory
  ],
  components: {
    CChart,
    CMovieCover
  },
  data () {
    return {
      canInitial: false,
      canMountChart: false,
      isLoad: true,
      dataset: null,
      showMovie: '',
      datasetColor: [
        'blue', 
        'red', 
        'pink', 
        'yellow', 
        'green', 
        'grey', 
        'white', 
        'brown', 
        'orange', 
        'purple'
      ],
    }
  },
  computed: {

    ...mapGetters({
      getRated: 'GET_RATED'
    }),

    maxVoteCount() {
      return Math.max(...this.dataset.map(v => v.vote_count))
    }

  },

  watch: {
    canInitial (valor) {
      console.log('Chamando watch .: ', valor)
        console.log('chamando o getLoadTop')

        this.getLoadTopRated()
    } 
  },

  methods: {
    ...mapActions({
      LoadList: 'LOAD_LIST'
    }),

    async getLoadTopRated () {
      const loadTopRated = await this.getRated.results
      console.log(loadTopRated)
      if (loadTopRated.length > 0 ) {
        this.dataset = loadTopRated.map(d => {
          return {
              id: d.id,
              title: d.title,
              vote_average: d.vote_average,
              vote_count: d.vote_count,
              poster_path: d.poster_path
            }
          })
          .sort( (a, b) => {
            return (a.vote_average < b.vote_average) ? -1 : (a.vote_average > b.vote_average) ? 1 : 0
          })
          .reverse()
          .slice(0,10)
          .map((d, i) => {
            return { ...d, order: `${i + 1}°`, color: this.datasetColor[i] }
          })
          this.canMountChart = true
      } else {
        this.canInitial = !this.canInitial
      }
    },

    onMouseover (data) {
      if(data) {
        this.showMovie = {
          ...data, 
          info: data.nameChart === 'chart01' 
            ? `User score: ${data.vote_average * 10}%`
            : `Vote Count: ${data.vote_count}`,

          positionTop: data.nameChart === 'chart01'
            ? '20vw'
            : '60vw'

        }
      } else {
        this.showMovie = ''
      }
    }
  },

  async created () {
    await this.LoadList({
      category: 'toprated'
    })
  },

  mounted () {
    console.log('Carregou 02', this.isLoad, this.dataset)
    this.canInitial = true
  },

  destroyed () {
    console.log('destruindo...')
  }

}
</script>