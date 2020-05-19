<template>
  <v-card tile dark class="overflow-hidden">
    <v-app-bar
      scroll-target="#scrolling-techniques-3"
      height="70"
    >
      <span>What's the Movie </span>
      <div class="col-8">
        <v-btn text class="btnInfo ma-2" tile to="/">
            Home
        </v-btn>
      </div>
      <v-spacer></v-spacer>

        <v-btn @click="openSearch" text icon>
          <v-icon text>mdi-magnify</v-icon>
        </v-btn>

        <v-layout>
          <v-flex shrink>
            <v-expand-x-transition>
              <div class="col-12 mt-8" v-if="isOpenSearch" style="white-space: nowrap">
                  <v-text-field
                    v-model="search"
                    height="10"
                    filled
                  ></v-text-field>
              </div>
            </v-expand-x-transition>
          </v-flex>
        </v-layout>
    </v-app-bar>

    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="calc(100vh - 70px)">
      <slot></slot>
    </v-sheet>
  </v-card>
</template>

<script>

export default {
  name: 'CAppBar',
  data: () => ({
    canHideOnScroll: false,
    isOpenSearch: false,
    search: ''
  }),
  methods: {
    openSearch () {
      this.isOpenSearch = !this.isOpenSearch
    }
  }
};
</script>
