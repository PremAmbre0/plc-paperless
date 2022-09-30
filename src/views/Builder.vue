<template>
    <div class="builder-wrapper">
        <component :is="selectedTool" @closeSidepanel="selectedTool=''" @addDataDrivenText="addText"></component>
        <div class="canvas-outer-wrapper">
            <div class="canvas-tools-wrapper">
                <div class="canvas-tools-templatename">{{name}}</div>
                <div class="canvas-tools">
                    <v-btn @click="addText({'type':'staticText','txt':'double tab to edit the text'})">Add Text
                    </v-btn>
                    <v-btn @click="selectedTool='DatasetPicker'">Add Data Driven Text</v-btn>
                    <v-btn @click="triggerFileInput() ">Add Image</v-btn>
                </div>
            </div>
            <div class="canvas-wrapper">
                <main-canvas v-if="isFetching" :templateData="templateData" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight" @openTextEditor="openTextEditor" @openImageEditor="openImageEditor" @closeEditor="closeEditor"></main-canvas>
            </div>
            <div class="canvas-submit">
                <v-btn class="canvas-submit-btn" @click="submitForProcessing">Submit For Processing</v-btn>
            </div>
        </div>
        <input ref="fileInput" type="file" @input="addImage" />
    </div>

</template>

<script>
import DatasetPicker from "../components/builder_tools/DatasetPicker.vue";
import FontHandler from "../components/builder_tools/FontHandler.vue";
import ImagePicker from "../components/builder_tools/ImagePicker.vue";
import MainCanvas from "../components/MainCanvas.vue";
import { eventBus } from "../EventBus";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            canvas: null,
            selectedTool:"",
            templateData: null,
            name: "",
            isFetching: false,
        };
    },
    components: {
        DatasetPicker, FontHandler, ImagePicker, MainCanvas
    },
    beforeMount() {
        this.getTemplateData();
    },
    computed: {
        canvasWidth() {
            return (window.outerWidth / 100) * 80;
        },
        canvasHeight() {
            return (window.outerHeight / 100) * 75;
        },
    },
    methods: {
        ...mapActions("templates", ["getTemplateById"]),
        getTemplateData() {
            this.getTemplateById({
                id: this.$route.params.id,
            }).then((response) => {
                this.templateData = response.data;
                this.name = response.data.name;
                this.isFetching = true;
            });
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        addText(paylaod){
            eventBus.$emit('addText',paylaod);
        },
        submitForProcessing(){
            eventBus.$emit('submitForProcessing');
        },
        addImage(e){
            eventBus.$emit('addImage',e);
        },
        openTextEditor(){
            this.selectedTool = "FontHandler";
        },
        openImageEditor(){
            this.selectedTool = "ImagePicker";
        },
        closeEditor(){
            this.selectedTool = "";
        }
    },
};
</script>

<style lang="scss" scoped>
.canvas-outer-wrapper {
    height: 100vh;
    width: 80vw;

    .canvas-tools-wrapper {
        align-items: center;
        height: 7vh;
        display: flex;
        padding: 0 3vw;
    }

    .canvas-tools-templatename {
        width: 30vw;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 900;
        text-transform: capitalize;
    }

    .canvas-tools {
        width: 50vw;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .v-btn {
            margin-left: 1.6rem;
        }
    }

    .canvas-wrapper {
        height: 75vh;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.builder-wrapper {
    height: 100vh;
    width: 100vw;
    background-color: rgba($tint-five, 0.1);
    position: fixed;
    display: flex;
    justify-content: center;
    margin-top: 0;
}

.canvas-submit {
    width: 80vw;
    display: flex;
    justify-content: flex-end;

    &-btn {
        margin-right: 5vw;
    }
}

input[type="file"] {
    height: 0;
    width: 0;
    visibility: hidden;
}
</style>