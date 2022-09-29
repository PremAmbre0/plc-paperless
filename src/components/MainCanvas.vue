<template>
    <div class="canvas-container-wrapper">
        <canvas ref="canvas" id="canvas"></canvas>
    </div>
</template>

<script>
import { eventBus } from "@/EventBus";
import CanvasInterface from "./canvasInterface/canvasInterface";
import { mapActions } from "vuex";

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
    computed: {
        currentFabricObject() {
            return this.canvas.activeCanvasObject
        }
    },
    watch: {
        currentFabricObject(newValue) {
            if (newValue.type == "staticText" || newValue.type == "fromDataset") {
                this.$emit('openTextEditor')
            } else if (newValue.type == "image") {
                this.$emit('openImageEditor')
            } else {
                this.$emit("closeEditor")
            }
        }
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
        ...mapActions("builder", ["submitJob"]),
        initializeListeners() {
            eventBus.$on('addText', (payload) => {
                this.canvas.addText(payload);
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
            eventBus.$on('submitForProcessing', () => {
                let AFO = this.canvas.allFabricObjects;
                let dataConfig = [];
                AFO.forEach((obj) => {
                    let style = {};
                    let imagePayload = {};
                    if (obj.type == "staticText" || obj.type == "fromDataset") {
                        style = this.canvas.getStyles(obj)
                    } else {
                        imagePayload = this.canvas.getImagePaylaod(obj);
                    }
                    let position = this.canvas.getPosition(obj);
                    switch (obj.type) {
                        case "staticText": {
                            dataConfig.push({
                                "type": obj.type,
                                "text": obj.txt,
                                "position": position,
                                "style": style,
                            });
                            break;
                        }
                        case "fromDataset": {
                            dataConfig.push({
                                "type": obj.type,
                                "datasetId": obj.datasetId,
                                "dataField": obj.dataField,
                                "position": position,
                                "style": style,
                            });
                            break;
                        }
                        case "image": {
                            dataConfig.push({
                                "type": obj.type,
                                ...imagePayload
                            })
                            break;
                        }
                    }
                });

                this.submitJob({
                    templateId: this.templateData._id,
                    dataConfig
                })
                    .then((response) => {
                        console.log(response)
                    });
            })
        },
    },
};
</script>

<style scoped>

</style>
