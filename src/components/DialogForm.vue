<template>
    <v-dialog v-model="showDialogForm">
        <div class="form-wrapper" @click.self="closeDialogForm()">
            <div class="template-form">
                <v-card v-if="currentSection == 'Templates'" height="80vh">
                    <form @submit.prevent>
                        <v-text-field v-model="tempName" label="Enter your Template name" width="50vw"
                            placeholder="Template Name" outlined>
                        </v-text-field>
                        <v-btn icon @click="removeImage">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <div for="file-input" class="imagePreviewWrapper"
                            :style="{ 'background-image': `url(${previewImage ? previewImage : '../assets/greybg.png'})` }">
                            <input ref="fileInput" type="file" accept="image/*" id="file-input" @dragover.prevent
                                @drop.prevent @input="pickFile">
                        </div>
                        <v-btn plain color="#BF2600" @click="closeDialogForm">cancel</v-btn>
                        <v-btn plain color="#00875A" @click="postTemplate" type="submit">submit</v-btn>
                    </form>
                </v-card>
                <v-card v-if="currentSection == 'Datasets'">
                    <v-card-text style="height: 100%;">
                        <v-form @submit.prevent>
                            <v-text-field v-model="datasetName" label="Enter your Datset Name name"
                                placeholder="Template Name" outlined></v-text-field>
                            <v-file-input v-if="datasetData.mode == 'new'" v-model="file" truncate-length="15"
                                show-size>
                            </v-file-input>
                            <v-data-table v-if="datasetData.mode == 'edit'" :headers="headers" :items="rows"
                                :items-per-page="5" class="elevation-1">
                            </v-data-table>
                            <v-btn plain color="#00875A" @click="postDataset" type="submit">submit</v-btn>
                        </v-form>
                    </v-card-text>

                </v-card>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    data() {
        return {
            tempName: '',
            file: null,
            previewImage: '',
            tempID: '',
            datasetName: '',
            headers: '',
            rows: [],
            datasetID: '',
        }
    },
    props: {
        templateData: { required: false, type: Object },
        datasetData: { required: false, type: Object }
    },
    computed: {
        ...mapGetters(['showDialogForm', 'currentSection']),
    },
    watch: {
        showDialogForm(newValue) {
            if (newValue == true) {
                this.setInitialFormData();
            }
            if (this.datasetData) {
                this.datasetHeaders();
                this.getDatasetData({
                    _id: this.datasetID
                }).then((response) => {
                    // console.log(response.rows, this.headers);
                    this.rows = response.rows;
                })
            }
        },

    },
    methods: {
        ...mapMutations(['closeDialogForm']),
        ...mapActions('templates', ['addTemplate', 'editTemplate']),
        ...mapActions('datasets', ['getDatasetData', 'uploadDataset']),
        reloadData() {
            this.$emit('reloadData');
        },
        setInitialFormData() {
            if (this.templateData) {
                if (this.templateData.templateName) {
                    this.tempName = this.templateData.templateName;
                } else {
                    this.tempName = ''
                }
                if (this.templateData.imageUrl) {
                    this.previewImage = this.templateData.imageUrl;
                } else {
                    this.previewImage = ''
                }
                if (this.templateData.id) {
                    this.tempID = this.templateData.id;
                } else {
                    this.tempID = ''
                }
            }
            if (this.datasetData) {
                if (this.datasetData.datasetName) {
                    this.datasetName = this.datasetData.datasetName;
                } else {
                    this.datasetName = ''
                }
                if (this.datasetData.headers) {
                    this.headers = this.datasetData.headers;
                } else {
                    this.headers = ''
                }
                if (this.datasetData.id) {
                    this.datasetID = this.datasetData.id;
                } else {
                    this.datasetID = ''
                }
            }
            this.file = null

        },
        showPreviewImage(input, file) {
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    this.previewImage = e.target.result;
                    this.file = file[0]
                }
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])

            }
        },
        pickFile() {
            let input = this.$refs.fileInput
            let file = input.files
            this.showPreviewImage(input, file,);
        },
        formDataValidation(name, file) {
            if (name == '') {
                window.alert("Error: \n Template name cannot be empty")
                return false;
            }
            if (!file) {
                window.alert("Error: \n Can't procceed without an image file")
                return false
            }
            else {
                return true
            }
        },
        removeImage() {
            this.file = null;
            this.previewImage = null;
        },
        postTemplate() {
            let data = new FormData();
            let name = this.tempName
            let file;
            if (this.mode == "new") {
                file = this.file
            } else {
                file = this.previewImage
            }
            if (this.formDataValidation(name, file)) {
                if (this.templateData.mode == 'new') {
                    data.append('file', this.file);
                    data.append('filename', this.file.name);
                    data.append('name', name);
                    this.closeDialogForm();
                    this.addTemplate(data).then((response) => {
                        console.log(response)
                    }).then(() => {
                        this.reloadData();
                        this.setInitialFormData();
                    })
                } else if (this.templateData.mode == 'edit') {
                    console.log('hi')
                    data.append('file', this.file);
                    data.append('name', name);
                    this.closeDialogForm();
                    this.editTemplate({
                        form: data,
                        id: this.tempID
                    }).then((response) => {
                        console.log(response);
                        this.reloadData();
                        this.setInitialFormData();

                    })
                }
            }
        },
        datasetHeaders() {
            let headers = []
            this.headers.forEach(function (header) {
                headers.push(
                    { 'text': header, 'value': header }
                )
            })
            this.headers = headers;
        },
        postDataset() {
            let data = new FormData();
            let name = this.datasetName;
            let file = this.file
            if (this.formDataValidation(name, file)) {
                data.append('file', file);
                data.append('name', name)
                this.closeDialogForm();
                this.uploadDataset(data).then((response) => {
                    console.log(response)
                }).then(() => {
                    this.reloadData();
                    this.setInitialFormData();
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.template-form {
    width: 90vw;
    height: 100%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 15%
}

.v-card {
    padding: 5%;
}

.form-wrapper {
    height: 100%;
    width: 100%;
    background-color: rgba($black , 0.8);
}

.imagePreviewWrapper {
    display: block;
    width: 75vw;
    max-width: 100rem;
    min-height: 40vh;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

input[type="file"] {
    opacity: 0;
    height:inherit;
    width: 100%;
}
</style>
