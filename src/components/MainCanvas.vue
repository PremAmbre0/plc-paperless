<template>
    <div class="canvas-container-wrapper">
        <input id="file" type="file" style="display: none" />
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
    created(){
        eventBus.$on('addText',(txt,type)=>{
            this.canvas.addText(txt,type);
        });
        eventBus.$on('addImage',(e)=>{
            this.canvas.addImage(e);
        })
    },
    mounted() {
        if (this.templateData) {
            this.canvas = new CanvasInterface({
                canvasImageUrl: this.templateData.imageUrl,
                canvas: this.$refs.canvas,
                initialCanvasHeight:this.canvasHeight,
                initialCanvasWidth:this.canvasWidth,
            });
            this.canvas.initCanvas();
        }
    },
    props: {
        templateData: { required: true, default: true },
        canvasWidth: { required: true},
        canvasHeight: { required: true},
    },
};
</script>

<style scoped>

</style>
