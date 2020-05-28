<template>
  <v-card tile class="mx-auto pa-1">
    <v-img
      :src="fullPath(image)"
      class="white--text align-end pl-5"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="2.7"
      style="position: relative;"
    >
      <div style="position: absolute; bottom: 0%; width:50%;">
        <h1>{{ title }}</h1>
        
        <h4 class="pa-4 my-5 opaqueBackground">{{ description }}</h4>

        <div class="row">
            <div>
              <v-btn class="btnInfo ma-2" :to="slug" tile>
                <v-icon left>mdi-pencil</v-icon> 
                More information
              </v-btn>
            </div>
        </div>
      </div>
    </v-img>
  </v-card>
</template>

<script>
import movieCategory from '@/mixins/movieCategory'
export default {
  name: 'CShowNewcoming',
  mixins: [
    movieCategory
  ],
  props: {
    idImage: {
      type: [ String, Number],
      default: 0
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String
    }
  },
  computed: {
    slug () {
      return '/movie-detail/' + this.idImage
    }
  }
}
</script>

<style lang="sass">
  .btnInfo
    opacity: .6
  .opaqueBackground
    background-color: rgba(177,177,177,0.2)

</style>