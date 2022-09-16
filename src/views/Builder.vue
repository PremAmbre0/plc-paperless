<template>
    <div class="builder-wrapper">
        <div class="canvas-wrapper">
            <canvas ref="canvas" id="canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
        </div>
    </div>

</template>

<script>
import { fabric } from "fabric";
export default {
    data() {
        return {
            canvas: null,
            selectedTool: "Add Text",
            templateData: null,
            tools: [
                { text: "Add Text", icon: "mdi-format-annotation-plus" },
                { text: "Use Dataset", icon: "mdi-file-table" },
                { text: "Add image", icon: "mdi-image" },
            ],
        };
    },

    mounted() {
        this.canvas = new fabric.Canvas(this.$refs.canvas);
        console.log(this.canvas);
    },
    computed: {
        canvasWidth() {
            return (window.outerWidth / 100) * 70;
        },
        canvasHeight() {
            return (window.outerHeight / 100) * 80;
        },
    },
    methods: {
        InitilaizeCanvas(canvasImg) {
            var canvas = this.canvas;
            fabric.Image.fromURL(canvasImg, (img) => {
                let imgHeight = img.height;
                let imgWidth = img.width;
                let canvasWidth = canvas.width;
                let canvasHeight = canvas.height;
                let newDimensions;
                newDimensions = this.maintainRatio(imgHeight, imgWidth, canvasHeight, canvasWidth)
                console.log(imgHeight, imgWidth, canvasHeight, canvasWidth);
                console.log(newDimensions);
                img.height = newDimensions.height;
                img.width = newDimensions.width;
                console.log(img);
                canvas.setBackgroundImage(img);
                canvas.renderAll();
            });
        },
        maintainRatio(imgHeight, imgWidth, canvasHeight, canvasWidth) {
            let widthRatio = canvasWidth / imgWidth;
            let HeightRatio = canvasHeight / imgHeight;
            let Ratio = widthRatio < HeightRatio ? widthRatio : HeightRatio;
            return {
                height: imgHeight * Ratio,
                width: imgWidth * Ratio,
            }
        },

    },
};
</script>

<style lang="scss" scoped>
.canvas-wrapper {
    height: 90vh;
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.builder-wrapper {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 4rem;
    display: flex;
}
</style>