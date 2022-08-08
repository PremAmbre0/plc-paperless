<template>
  <v-app>
    <paperless-header v-show="isAuth"></paperless-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import PaperlessHeader from './components/PaperlessHeader.vue';
export default {
  name: "App",
  data: () => ({
    //
  }),
  components:{
    PaperlessHeader
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  }
};
</script>

<style lang="scss" scoped>
</style>
