<template>
    <v-dialog v-model="showDialogForm" fullscreen transition="dialog-bottom-transition">
        <div class="form-wrapper" @click.self="closeDialogForm">
            <div class="template-form">
                <v-card>
                    <v-text-field v-model="templateName" label="Enter your Template name" width="50vw" placeholder="Template Name" outlined>
                    </v-text-field>
                    <image-dropzone :imageUrl="previewImageUrl"></image-dropzone>
                </v-card>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ImageDropzone from "./ImageDropzone.vue";
export default {    
    data() {
        return {
        }
    },
    props:{
        templateName:{
            type:String
        },
        imageUrl:{
            type:String
        }
    },
    components: {
        ImageDropzone,
    },
    computed: {
        ...mapGetters(['showDialogForm']),
        previewImageUrl(){
            return this.imageUrl
        }
    },
    methods: {
        ...mapMutations(['closeDialogForm'])
    },
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
.form-wrapper{
    height: 100%;
    width: 100%;
    background-color: rgba($black , 0.8);
}
</style>
