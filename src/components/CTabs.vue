<template>
  <div style="height: calc(100vh - 70px)">
    <v-tabs v-model="tabPos"
      :background-color="color"
      :color="fontColor"
      slider-color="red"
      slider-size=4
      :centered="centered"
      :vertical="vertical"
    >

      <v-tab v-for="(tab, index) in tabs" :key="index">
        {{ tab }}
      </v-tab>

      <v-tabs-items v-model="tabPos">
        <v-tab-item v-for="(tab, id) in tabs" :key="id" >
          <v-responsive :aspect-ratio="2.4" :class="colorItem" style="height: calc(100vh - 120px)">
            <slot :name="`tab${id + 1}`" />
          </v-responsive>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {
        tabPos: 0
      }
    },
    props: {
      vertical: {
        type: Boolean,
        default: false
      },
      centered: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: 'transparent'
      },
      colorItem: {
        type: String,
        default: 'black'
      },
      fontColor: {
        type: String,
        default: 'white'
      },
      tabs: {
        type: Array
      }
    }
  }
</script>