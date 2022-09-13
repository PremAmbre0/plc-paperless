<template>
  <div>
    <div class="template-container">
      <template-cards
        v-for="template in templatesList"
        :key="template.createdOn"
        :name="template.name"
        :imageUrl="template.imageUrl"
        :id="template._id"
        @click.native="setSelectedTemplate(template)"
        @deleteTemp="deleteTemp"
        @openBuilder="openBuilder"
      />
    </div>
    <dialog-form
      :existingFormData="selectedTemplate"
      @reloadData="getData"
    ></dialog-form>
    <v-btn
      class="add-temp"
      fab
      dark
      color="indigo"
      @click="removeselectedTemplate()"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
    <v-overlay :value="showOverlayLoader">
      <v-progress-circular
        indeterminate
        color="#5243AA"
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TemplateCards from "../components/TemplateCards.vue";
import DialogForm from "../components/DialogForm.vue";
export default {
  data() {
    return {
      selectedTemplate: {},
      templatesList: [],
    };
  },
  computed: {
    ...mapGetters(["showOverlayLoader"]),
  },
  components: {
    TemplateCards,
    DialogForm,
  },
  async created() {
    this.getData();
  },
  methods: {
    ...mapActions("templates", ["getTemplatesList", "deleteTemplate"]),
    ...mapMutations(["openDialogForm"]),
    getData() {
      this.getTemplatesList({
        pageSize: 100,
        pageNo: 1,
      }).then((data) => {
        this.templatesList = data.list;
      });
    },
    setSelectedTemplate(template) {
      this.selectedTemplate.name = template.name;
      this.selectedTemplate.existingFile = template.imageUrl;
      this.selectedTemplate.id = template._id;
      this.selectedTemplate.mode = "edit";
      this.openDialogForm();
    },
    removeselectedTemplate() {
      this.selectedTemplate.name = "";
      this.selectedTemplate.existingFile = "";
      this.selectedTemplate.id = "";
      this.selectedTemplate.mode = "new";
      this.openDialogForm();
    },
    deleteTemp(id) {
      if (window.confirm("Are you sure you want to deleteTemplate?")) {
        this.deleteTemplate({
          id: id,
        }).then(() => {
          this.getData();
        });
      }
    },
    openBuilder(id) {
      this.$router.push("/builder/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.template-container {
  max-width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 2%;
  grid-template-columns: repeat(2, 48%);
  margin-top: 7vh;
}

.add-temp {
  position: fixed;
  right: 5%;
  bottom: 3%;
}

@media (max-width: 500px) {
  .template-container {
    grid-row-gap: 2%;
    grid-template-columns: 98%;
  }
}

@media (min-width: 750px) {
  .template-container {
    grid-column-gap: 2%;
    grid-row-gap: 2%;
    grid-template-columns: repeat(3, 31.33%);
  }
}

@media (min-width: 1000px) {
  .template-container {
    grid-column-gap: 2%;
    grid-row-gap: 2%;
    grid-template-columns: repeat(4, 23%);
  }
}

@media (min-width: 1440px) {
  .template-container {
    grid-column-gap: 2%;
    grid-row-gap: 2%;
    grid-template-columns: repeat(5, 18%);
  }
}
</style>
