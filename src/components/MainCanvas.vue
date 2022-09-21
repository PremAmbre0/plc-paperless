<template>
    <div class="canvas-container-wrapper">
        <input id="file" type="file" style="display: none" />
        <canvas ref="canvas" id="canvas"></canvas>
    </div>
</template>

<script>
// import { eventBus } from "@/event-bus";
import CanvasInterface from "./canvasInterface/canvasInterface";

export default {
    data() {
        return {
            canvas: {},
        };
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
        // this.initialiseListeners();
    },
    // mounted() {
    // this.canvas.addListnerOnFileInput();

    // this.canvas.addEventListener("init", () => {
    // 	eventBus.$emit("initialised-canvas");
    // });
    // this.canvas.addEventListener("object-selected", (objectAttributes) => {
    // 	eventBus.$emit("object-selected", objectAttributes);
    // });
    // this.canvas.addEventListener("object-deselected", () => {
    // 	eventBus.$emit("object-deselected");
    // });
    // this.canvas.addEventListener("all-canvas-properties-and-elements", (properties) => {
    // 	eventBus.$emit("all-canvas-properties-and-elements", properties);
    // });
    // this.canvas.initCanvas();
    // },
    // beforeDestroy() {
    // 	eventBus.$off("add-text-object");
    // 	eventBus.$off("add-image-object");
    // 	eventBus.$off("update-text-attribute");
    // 	eventBus.$off("update-image-attribute");
    // 	eventBus.$off("get-all-canvas-properties-and-elements");
    // 	eventBus.$off("add-data-driven-text-object");
    // 	eventBus.$off("dataset-selection");
    // },
    // methods: {
    // 	initialiseListeners() {
    // 		eventBus.$on("add-text-object", (text, textProperties) => {
    // 			this.canvas.handleAddTextEvent(text, textProperties);
    // 		});
    // 		eventBus.$on("add-data-driven-text-object", (text, textProperties) => {
    // 			eventBus.$emit("data-driven-text-add-event");
    // 		});
    // 		eventBus.$on("dataset-selection", (datasetDetails) => {
    // 			this.canvas.handleAddTextEvent(
    // 				`${datasetDetails.datasetName}.${datasetDetails.fieldName}`,
    // 				{
    // 					id: "dataDriven_" + datasetDetails.datasetId + "_" + uuidv4(),
    // 					left: this.selectedRender.dimension.width / 2,
    // 					top: this.selectedRender.dimension.height / 2,
    // 					lockSkewingX: true,
    // 					lockSkewingY: true,
    // 					fontSize: "40", // Font Size
    // 					fontFamily: "Arial, Helvetica, sans-serif", // Font Family
    // 					fill: "#000",
    // 					editable: false,
    // 				},
    // 				"Text"
    // 			);
    // 		});
    // 		eventBus.$on("update-text-attribute", (data) => {
    // 			this.canvas.handleUpdateTextAttribute(data);
    // 		});
    // 		eventBus.$on("add-image-object", () => {
    // 			this.canvas.handleAddImageEvent();
    // 		});
    // 		eventBus.$on("update-image-attribute", (data) => {
    // 			this.canvas.handleUpdateImageAttribute(data);
    // 		});
    // 		eventBus.$on("get-all-canvas-properties-and-elements", () => {
    // 			this.canvas.handleGetAllCanvasElementsEvent();
    // 		});
    // 	},
    // },
    props: {
        templateData: { required: true, default: true },
        canvasWidth: { required: true},
        canvasHeight: { required: true},
    },
};
</script>

<style scoped>

</style>
