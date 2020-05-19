<template>
  <v-app>
    <c-app-bar>
      <router-view />
    </c-app-bar>
  </v-app>
</template>

<script>
import CAppBar from './components/CAppBar'
export default {
  name: 'MainApp',
  components: {
    CAppBar
  }
};
</script>
