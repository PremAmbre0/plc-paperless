<template>
    <div class="builder-wrapper">
        <component :is="selectedTool" @closeSidepanel="selectedTool=''"></component>
        <div class="canvas-outer-wrapper">
            <div class="canvas-tools-wrapper">
                <div class="canvas-tools-templatename">Template Name :{{name}}</div>
                <div class="canvas-tools">
                    <v-btn @click="selectedTool='FontHandler'">Add Text</v-btn>
                    <v-btn @click="selectedTool='DatasetPicker'">Add Data Driven Text</v-btn>
                    <v-btn @click="selectedTool='ImagePicker'">Add Image</v-btn>
                </div>
            </div>
            <div class="canvas-wrapper">
                <canvas ref="canvas" id="canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
            </div>
            <div class="canvas-submit">
                <v-btn class="canvas-submit-btn">Submit For Processing</v-btn>
            </div>
        </div>
    </div>

</template>

<script>
import DatasetPicker from "../components/builder_tools/DatasetPicker.vue";
import FontHandler from "../components/builder_tools/FontHandler.vue";
import ImagePicker from "../components/builder_tools/ImagePicker.vue";
import { fabric } from "fabric";
import { mapActions } from "vuex";


export default {
    data() {
        return {
            canvas: null,
            selectedTool: "FontHandler",
            templateData: null,
            name: "",
        };
    },
    components: {
        DatasetPicker, FontHandler, ImagePicker,
    },
    mounted() {
        this.getTemplateData();
        this.canvas = new fabric.Canvas(this.$refs.canvas);
    },
    computed: {
        canvasWidth() {
            return (window.outerWidth / 100) * 70;
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
                this.name = response.data.name
                this.InitilaizeCanvas(this.templateData.imageUrl);
            });
        },
        InitilaizeCanvas(canvasImg) {
            var canvas = this.canvas;
            fabric.Image.fromURL(canvasImg, (img) => {
                console.log(canvas.height, canvas.width)
                let newDimensions = this.maintainRatio(img.height, img.width, canvas.height, canvas.width)
                let xScale = newDimensions.width / img.width;
                let yScale = newDimensions.height / img.height
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: xScale,
                    scaleY: yScale
                })
                canvas.setHeight(newDimensions.height)
                canvas.setWidth(newDimensions.width);
                canvas.renderAll();
            });
        },
        maintainRatio(imgHeight, imgWidth, canvasHeight, canvasWidth) {
            let widthRatio = canvasWidth / imgWidth;
            let HeightRatio = canvasHeight / imgHeight;
            let ratio = widthRatio < HeightRatio ? widthRatio : HeightRatio;
            return {
                height: Math.round(imgHeight * ratio),
                width: Math.round(imgWidth * ratio),
            }
        },

    },
};
</script>

<style lang="scss" scoped>

.canvas-outer-wrapper{
    height: 100vh;
    width: 80vw;
    background-color: $white;
    .canvas-tools-wrapper{
        align-items: center;
        height: 7vh;
        display: flex;
        padding: 0 3vw;
    }
    .canvas-tools-templatename{
        width:30vw;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
    }
    .canvas-tools{
        width:50vw;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .v-btn{
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
    background-color: rgba($tint-five,0.1);
    position: fixed;
    display: flex;
    justify-content: center;
    margin-top: 0;
}
.canvas-submit{
    width: 80vw;
    display: flex;
    justify-content: flex-end;
    &-btn{
        margin-right: 5vw;
    }
}
</style>}