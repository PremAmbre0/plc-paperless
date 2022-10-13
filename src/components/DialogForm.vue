<template>
  <v-dialog v-model="showDialogForm" max-width="600" persistent>
    <v-card max-width="600">
      <form @submit.prevent>
        <v-text-field
          v-model="name"
          :label="placeholderText"
          width="50vw"
          :placeholder="placeholderTitle"
          outlined
        >
        </v-text-field>
        <div class="droparea" @dragover.prevent @drop.stop.prevent>
          <div class="droparea-empty" v-if="mode == 'new' && !inputFile">
            <label for="fileInput" class="label">
              Click here to drop or select the file</label
            >
            <input
              ref="fileInput"
              type="file"
              @input="filePickHandler($event)"
              id="fileInput"
            />
          </div>
          <div
            class="droparea-filled"
            v-if="mode == 'edit' || inputFile"
            :style="{ overflowY: overflowProperty }"
          >
            <div class="file-wrapper">
              <v-btn
                class="close-btn"
                color="$black"
                tile
                elevation="2"
                x-small
                @click="removeFile"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <img
                ref="fileInput"
                class="img"
                v-if="currentSection == 'templates'"
                :src="existingFile ? existingFile : inputFile"
              />
              <v-data-table
                v-if="currentSection == 'datasets'"
                :items-per-page="5"
                :headers="
                  existingFile ? existingFile.headers : inputFile.headers
                "
                :items="existingFile ? existingFile.rows : inputFile.rows"
                class="elevation-1"
              >
              </v-data-table>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn plain color="#BF2600" @click="closeDialogForm">cancel</v-btn>
          <v-btn
            plain
            color="#00875A"
            @click="submitEventHandler()"
            type="submit"
            >submit</v-btn
          >
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { read, utils } from "xlsx";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      id: "",
      inputFile: null,
      existingFile: null,
      mode: "",
      fileToPost: null,
    };
  },
  props: {
    existingFormData: { type: Object },
  },
  computed: {
    ...mapGetters(["showDialogForm"]),
    placeholderText() {
      if (this.currentSection == "templates") {
        return "Enter Your template name";
      } else {
        return "Enter Your dataset name";
      }
    },
    placeholderTitle() {
      if (this.currentSection == "templates") {
        return "Template Name";
      } else {
        return "Dataset Name";
      }
    },
    overflowProperty() {
      if (this.currentSection == "templates") {
        return "hidden";
      } else {
        return "scroll";
      }
    },
    currentSection(){
      return this.$route.name
    }
  },
  watch: {
    showDialogForm(newValue) {
      if (newValue == true) {
        this.setInitialFormData();
      }
      if (newValue == false) {
        this.resetFormData();
      }
      if (
        this.existingFormData.mode == "edit" &&
        this.currentSection == "datasets"
      ) {
        this.openOverlayLoader();
        this.getDatasetData({
          _id: this.id,
        }).then((response) => {
          this.getdatasetHeaders();
          this.closeOverlayLoader();
          this.existingFile.rows = response.rows;
        });
      }
    },
    existingFile(newValue) {
      if (newValue == null) {
        this.mode = "new";
      }
    },
  },
  methods: {
    ...mapMutations([
      "closeDialogForm",
      "openOverlayLoader",
      "closeOverlayLoader",
    ]),
    ...mapActions("templates", ["addTemplate", "editTemplate"]),
    ...mapActions("datasets", ["getDatasetData", "uploadDataset"]),
    reloadData() {
      this.$emit("reloadData");
    },
    submitEventHandler() {
      if (this.currentSection == "templates") {
        this.postTemplate();
      } else {
        this.postDataset();
      }
    },
    getdatasetHeaders() {
      let headers = [];
      var obj = this.existingFile;
      obj.headers.forEach(function (header) {
        headers.push({ text: header, value: header });
      });
      this.existingFile.headers = headers;
    },
    setInitialFormData() {
      if (this.existingFormData.name) {
        this.name = this.existingFormData.name;
      } else {
        this.name = "";
      }
      if (this.existingFormData.id) {
        this.id = this.existingFormData.id;
      } else {
        this._id = "";
      }
      if (this.existingFormData.existingFile) {
        this.existingFile = this.existingFormData.existingFile;
      } else {
        this.existingFile = "";
      }
      if (this.existingFormData.mode) {
        this.mode = this.existingFormData.mode;
      } else {
        this.mode = "";
      }
      this.inputfile = null;
    },
    showPreviewImage(input, file) {
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.inputFile = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    filePickHandler(e) {
      if (this.currentSection == "templates") {
        this.pickImageFile();
      } else {
        this.pickXLSXFile(e);
      }
    },
    pickImageFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      this.fileToPost = file[0];
      this.showPreviewImage(input, file);
    },
    removeFile() {
      if (this.inputFile) {
        this.inputFile = null;
      }
      if (this.existingFile) {
        this.existingFile = null;
      }
    },
    pickXLSXFile(e) {
      var f = e.target.files[0];
      this.fileToPost = f;
      var reader = new FileReader();
      reader.onload = (e) => {
        var data = e.target.result;
        var workbook = read(data);
        let sheet = workbook.Sheets.Sheet1;
        let aoa = utils.sheet_to_json(sheet, { header: 1 });
        let headersToIterate = aoa[0];
        let headersForDataset = [];
        headersToIterate.forEach((ele) => {
          headersForDataset.push({
            text: ele,
            value: ele,
          });
        });
        let rowsToIterate = aoa.slice(1);
        let rowsForDataset = [];
        rowsToIterate.forEach((row) => {
          let obj = {};
          for (var i = 0; i < row.length; i++) {
            obj[headersToIterate[i]] = row[i];
          }
          rowsForDataset.push(obj);
        });
        var obj = {
          headers: headersForDataset,
          rows: rowsForDataset,
        };
        this.$nextTick(() => {
          this.inputFile = obj;
        });
      };
      reader.readAsArrayBuffer(f);
      this.$emit("input", f);
    },
    formDataValidation(name, file) {
      if (name == "") {
        window.alert("Error: \n Template name cannot be empty");
        return false;
      }
      if (!file && this.existingFormData.mode == "new") {
        window.alert("Error: \n Can't procceed without an image file");
        return false;
      } else {
        return true;
      }
    },
    postTemplate() {
      let data = new FormData();
      let name = this.name;
      let file = this.fileToPost;
      if (this.formDataValidation(name, file)) {
        if (this.existingFormData.mode == "new") {
          data.append("file", file);
          data.append("filename", this.fileName);
          data.append("name", name);
          this.closeDialogForm();
          this.addTemplate(data)
            .then((response) => {
              console.log(response);
            })
            .then(() => {
              this.reloadData();
              this.setInitialFormData();
            });
        } else if (this.existingFormData.mode == "edit") {
          data.append("file", file);
          data.append("name", name);
          this.closeDialogForm();
          this.editTemplate({
            form: data,
            id: this.id,
          }).then((response) => {
            console.log(response);
            this.reloadData();
            this.setInitialFormData();
          });
        }
      }
    },
    postDataset() {
      let data = new FormData();
      let name = this.name;
      let file = this.fileToPost;
      if (this.formDataValidation(name, file)) {
        data.append("file", file);
        data.append("name", name);
        console.log(...data);
        this.closeDialogForm();
        this.uploadDataset(data)
          .then((response) => {
            console.log(response);
          })
          .then(() => {
            this.reloadData();
            this.setInitialFormData();
          });
      }
    },
    resetFormData() {
      this.name = "";
      this.id = "";
      this.inputFile = null;
      this.existingFile = null;
      this.mode = "";
      this.fileToPost = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  padding: 5%;
}

.droparea {
  display: block;
  height: 50vh;
  width: 100%;

  &-empty {
    height: 100%;
    width: 100%;
    background-color: $light-three;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    padding: 5%;
    text-align: center;
    color: $light-one;
    font-weight: 500;
    border-radius: 0.5rem;
    position: relative;
  }

  &-filled {
    display: flex;
    justify-content: center;
    height: 90%;
  }
}

.img {
  object-fit: contain;
  height: 100%;
}

.label {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
}

input[type="file"] {
  height: 100%;
  width: 100%;
  opacity: 0;
  position: absolute;
}

.file-wrapper {
  position: relative;
}

.v-btn.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.v-icon {
  font-size: 1rem;
}
</style>
