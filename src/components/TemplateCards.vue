<template>
  <v-card class="mx-auto" outlined elevation="4">
    <v-img :src="imageUrl" height="180px" contain></v-img>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop.prevent="$emit('openBuilder',id)" color="#04ACB8">
        <v-icon> mdi-image-edit</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop.prevent="$emit('downloadImage',name,imageUrl)" color="#5c946e">
        <v-icon> mdi-download </v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop.prevent="$emit('deleteTemp',id)" color="#BF2600">
        <v-icon> mdi-delete</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      { option: "Preview" },
      { option: "Edit Template" },
      { option: "Delete" },
      { option: "Open in Builder" },
      { option: "Download" },
    ],
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },

  },
};
</script>

<style lang="scss" scoped>
.v-card {
  padding-top: 5%;

  &__title {
    padding-bottom: 0;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
