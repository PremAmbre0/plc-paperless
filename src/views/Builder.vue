<template>
    <div class="builder-wrapper">
        <div class="canvas-wrapper">
            <canvas ref="canvas" id="canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
        </div>
    </div>

</template>

<script>
import { fabric } from "fabric";
import { mapActions } from 'vuex';
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
        this.getTemplateData();
        this.canvas = new fabric.Canvas(this.$refs.canvas);
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
        ...mapActions("templates", ["getTemplateById"]),
        getTemplateData() {
            this.getTemplateById({
                id: this.$route.params.id,
            }).then((response) => {
                this.templateData = response.data;
                this.InitilaizeCanvas(this.templateData.imageUrl);
            });
        },
        InitilaizeCanvas(canvasImg) {
            var canvas = this.canvas;
            fabric.Image.fromURL(canvasImg, (img) => {
                let newDimensions = this.maintainRatio(img.height, img.width, canvas.height, canvas.width)
                console.log(img.height,img.width,newDimensions)
                let xScale = newDimensions.width / img.width;
                let yScale = newDimensions.height / img.height
                let top = (canvas.height - newDimensions.height)/2
                let left = (canvas.width - newDimensions.width)/2
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas),{
                    top:top,
                    left:left,
                    scaleX:xScale,
                    scaleY:yScale
                });
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