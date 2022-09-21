<template>
    <div class="builder-wrapper">
        <component :is="selectedTool" @closeSidepanel="selectedTool=''" @addDataDrivenText="addText"></component>
        <div class="canvas-outer-wrapper">
            <div class="canvas-tools-wrapper">
                <div class="canvas-tools-templatename">Template Name :{{name}}</div>
                <div class="canvas-tools">
                    <v-btn @click="selectedTool='FontHandler' ; addText('Tap to edit the text','normal')">Add Text
                    </v-btn>
                    <v-btn @click="selectedTool='DatasetPicker'">Add Data Driven Text</v-btn>
                    <v-btn @click="selectedTool='ImagePicker' ; triggerFileInput()">Add Image</v-btn>
                </div>
            </div>
            <div class="canvas-wrapper">
                <main-canvas v-if="isFetching" :templateData="templateData" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"></main-canvas>
            </div>
            <div class="canvas-submit">
                <v-btn class="canvas-submit-btn">Submit For Processing</v-btn>
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
import { fabric } from "fabric";
// import { EventBus } from "../EventBus";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            canvas: null,
            selectedTool: "FontHandler",
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
        addText(txt, type) {
            let _id = this.generateUniqueId();
            let textAttributes = {
                _id: _id,
                top: this.canvas.height / 2,
                left: this.canvas.width / 2,
                fontSize: 40,
                fill: '#000',
            }
            if (type == 'normal') {
                this.canvas.add(new fabric.IText(txt, textAttributes))
            }
            else {
                this.canvas.add(new fabric.Text(txt, textAttributes))
            }
            this.canvas.renderAll();
        },
        addImage(e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = (f) => {
                var data = f.target.result;
                console.log(data)
                let _id = this.generateUniqueId();
                fabric.Image.fromURL(data, (img) => {
                    let newDimensions = this.maintainRatio(img.height, img.width, this.canvas.height / 2, this.canvas.width / 2)
                    let xScale = newDimensions.width / img.width;
                    let yScale = newDimensions.height / img.height
                    img.set({
                        _id: _id,
                        top: (this.canvas.height - newDimensions.height) / 2,
                        left: (this.canvas.width - newDimensions.width) / 2,
                        angle: 0,
                        scaleX: xScale,
                        scaleY: yScale,
                    })
                    this.canvas.add(img,).renderAll();
                });
            };
            reader.readAsDataURL(file);
        }
    },
};
</script>

<style lang="scss" scoped>
.canvas-outer-wrapper {
    height: 100vh;
    width: 80vw;
    background-color: $white;

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