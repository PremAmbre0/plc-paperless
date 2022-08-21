<template>
    <v-dialog v-model="showDialogForm" fullscreen>
        <div class="form-wrapper" @click.self="closeDialogForm">
            <div class="template-form">
                <v-card>
                    <form @submit.prevent>
                        <v-text-field v-model="tempName" label="Enter your Template name" width="50vw"
                            placeholder="Template Name" outlined>
                        </v-text-field>
                        <v-icon>mdi-close</v-icon>
                        <div for="file-input" class="imagePreviewWrapper"
                            :style="{ 'background-image': `url(${previewImage ? previewImage : '../assets/greybg.png'})` }">
                            <input ref="fileInput" type="file" accept="image/*" id="file-input" @dragover.prevent
                                @drop.prevent @input="pickFile">
                        </div>
                        <v-btn plain color="#BF2600" @click="closeDialogForm">cancel</v-btn>
                        <v-btn plain color="#00875A" @click="postTemplate" type="submit">submit</v-btn>
                    </form>
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
            file: '',
            previewImage: '',
            tempID: ''
        }
    },
    props: {
        templateName: { required: false, type: String },
        imageUrl: { required: false, type: String },
        mode: { required: true, type: String },
        id: { required: false, type: String },
    },
    computed: {
        ...mapGetters(['showDialogForm']),
    },
    watch: {
        showDialogForm(newValue) {
            if (newValue == true) {
                this.setInitialFormData();
            }
        }
    },
    methods: {
        ...mapMutations(['closeDialogForm']),
        ...mapActions('templates', ['addTemplate', 'editTemplate']),
        reloadData() {
            this.$emit('reloadData');
        },
        setInitialFormData() {
            if (this.templateName) {
                this.tempName = this.templateName;
            } else {
                this.tempName = ''
            }
            if (this.imageUrl) {
                this.previewImage = this.imageUrl;
            } else {
                this.previewImage = ''
            }
            if (this.id) {
                this.tempID = this.id;
            } else {
                this.tempID = ''
            }

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
            this.showPreviewImage(input, file);
        },
        async postTemplate() {
            let data = new FormData();
            let name = this.tempName
            if (this.mode == 'new') {
                data.append('file', this.file);
                data.append('filename', this.file.name);
                data.append('name', name);
                this.closeDialogForm();
                this.addTemplate(data).then((response) => {
                    console.log(response)
                }).then(() => {
                    this.reloadData();
                })
            } else if (this.mode == 'edit') {
                data.append('file', this.file);
                data.append('name', name);
                this.closeDialogForm();
                this.editTemplate({
                    form: data,
                    id: this.tempID
                }).then((response) => {
                    console.log(response);
                    this.reloadData();
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.template-form {
    width: 50vw;
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
    max-width: 50vw;
    min-height: 20rem;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

input[type="file"] {
    opacity: 0;
    min-height: 20rem;
    width: 100%;
}
</style>
