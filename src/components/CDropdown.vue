<template>
  <div class="text-center">
    <v-menu offset-y dark>

      <template v-slot:activator="{ on }">
          <v-btn text class="subtitle-2" tile v-on="on">
            {{ name }}
            <v-icon>mdi-format-line-spacing</v-icon>
          </v-btn>
      </template>
            
      <v-card class="mx-auto" width="500" tile>
        <v-list>
          <v-subheader>{{ title }}</v-subheader>
          <v-list-item-group v-model="item">
            <div class="row no-gutters">
              <div class="col-4" v-for="(item, i) in items" :key="i" style="padding: 0px">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </v-list-item-group>
        </v-list>
      </v-card>

    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'CDropdown',
  data: () => ({
    item: 3,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' }
    ],
  }),
  props: {
    name: {
      type: String,
      default: 'Dropdown'
    },
    title: {
      type: String,
      default: 'Dropdown title'
    }
  }
}
</script>

<style lang="sass" >
  .v-list-item 
    min-height: 8px !important

  .v-btn:not(.v-btn--round).v-size--default
    padding: 2px 0 !important

  .v-list-item__content
    padding: 2px 0 !important
    color: white

</style>