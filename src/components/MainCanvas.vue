<template>
    <div class="canvas-container-wrapper">
        <canvas ref="canvas" id="canvas"></canvas>
    </div>
</template>

<script>
import { eventBus } from "@/EventBus";
import CanvasInterface from "./canvasInterface/canvasInterface";

export default {
    data() {
        return {
            canvas: {},
        };
    },
    props: {
        templateData: { required: true, default: true },
        canvasWidth: { required: true },
        canvasHeight: { required: true },
    },
    created() {
        this.initializeListeners();
    },
    mounted() {
        if (this.templateData) {
            this.canvas = new CanvasInterface({
                canvasImageUrl: this.templateData.imageUrl,
                canvas: this.$refs.canvas,
                initialCanvasHeight: this.canvasHeight,
                initialCanvasWidth: this.canvasWidth,
            });
            this.canvas.initCanvas();
        }
    },
    methods: {
        initializeListeners() {
            eventBus.$on('addText', (txt, type) => {
                this.canvas.addText(txt, type);
            });
            eventBus.$on('addImage', (e) => {
                this.canvas.addImage(e);
            })
            eventBus.$on('updateTextAttribute', (data) => {
                this.canvas.handleTextUpdate(data);
            })
            eventBus.$on('updateImageOpacity', (data) => {
                this.canvas.handleImageOpacity(data);
            });
        }
    },
};
</script>

<style scoped>

</style>
