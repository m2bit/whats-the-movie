import { mapGetters } from 'vuex'

export default {
  name: 'MovieCategory',
  methods: {
    fullPath (image) {
      return image !== '' && image
        ? this.getPathUrlImage + image 
        : ''
    },
  },
  computed: {
    ...mapGetters({
      getPathUrlImage: 'GET_URLIMAGE'
    }),
  },
}