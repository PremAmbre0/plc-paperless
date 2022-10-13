<template>
  <v-app id="app">
    <paperless-header></paperless-header>
    <router-view></router-view>
    <v-snackbar v-model="localSnackbarState" multi-line light :timeout="snackbarTime" text :color="snackbarColor" top >
      {{snackbarText}}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click.stop="closeSnackbar" icon>
          <v-icon color="#091E42">mdi-close</v-icon>
        </v-btn>
      </template>

    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PaperlessHeader from "./components/PaperlessHeader.vue";
export default {
  name: "App",
  data: () => ({
    localSnackbarState: false,
  }),
  methods: {
    ...mapMutations(["openSnackbar", "closeSnackbar"]),
  },
  components: {
    PaperlessHeader,
  },
  computed: {
    ...mapGetters(["snackbarState", "snackbarText", "snackbarTime","snackbarColor"]),
  },
  watch: {
    snackbarState(nv) {
      this.localSnackbarState = nv;
    },
    localSnackbarState(nv) {
      if (!nv) {
        this.closeSnackbar();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  overflow-x: hidden;
}

.snackbarComponentWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // err since error is the styling class in vuetify
  &.err {
    color: $red;
  }
}
</style>
