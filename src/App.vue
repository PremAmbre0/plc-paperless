<template>
  <v-app id="app">
    <paperless-header></paperless-header>
      <router-view></router-view>
  </v-app>
</template>

<script>
import PaperlessHeader from './components/PaperlessHeader.vue';
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    PaperlessHeader
  },
};
</script>

<style lang="scss" scoped>
#app {
  overflow-x: hidden;
}

</style>
