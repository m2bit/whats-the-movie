<template>
  <c-tabs :tabs="tabs" >
    <template v-slot:tab1>
      <detail-page />
    </template>
    <template v-slot:tab2>
      <traillers />
    </template>
    <template v-slot:tab3>
      <cast-crew />
    </template>
  </c-tabs>
</template>

<script>
import CTabs from '../components/CTabs'
import detailPage from './DetailPage'
import castCrew from './CastCrew'
import traillers from './Traillers'

export default {
  components: {
    CTabs,
    detailPage,
    castCrew,
    traillers
  },
  data () {
    return {
      tabs: [
        'Overview',
        'Traillers',
        'Cast and Crew'
      ]
    }
  },

  
}

</script>

<style lang="sass">
  .certificationMovie
    position: absolute
    bottom: 44px
    right:0px
    background: #000000
    opacity: 0.5
    padding: 0px
    border-left: solid #fff 6px
    border-radius: 5px 0% 0% 5px
    width: 90px
</style>