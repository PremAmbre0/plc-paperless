import { fabric } from "fabric";

const initializeCanvas = {
    initCanvas() {
        this.canvasObject = new fabric.Canvas(this.canvas, {
            height: this.initialCanvasHeight,
            width: this.initialCanvasWidth,
            preserveObjectStacking: true,
        });
        fabric.Image.fromURL(this.canvasImageUrl, (img) => {
            let newDimensions = this.getMaintainedAspectRatio(img.height, img.width, this.canvasObject.height, this.canvasObject.width)
            let xScale = newDimensions.width / img.width;
            let yScale = newDimensions.height / img.height
            this.canvasObject.setBackgroundImage(img, this.canvasObject.renderAll.bind(this.canvasObject), {
                scaleX: xScale,
                scaleY: yScale
            })
            this.canvasObject.setHeight(newDimensions.height)
            this.canvasObject.setWidth(newDimensions.width);
            this.canvasObject.renderAll();
        });
    },
    // initialiseFabricListners() {
    // 	this.canvasObject.on("mouse:down", () => {
    // 		const activeObject = this.canvasObject.getActiveObject();
    // 		if (activeObject && activeObject.id !== this.activeCanvasObject.id) {
    // 			this.activeCanvasObject = activeObject;
    // 			this.onObjectSelected(this.getObjectAttributesFromType(activeObject));
    // 		} else if (!activeObject && Object.keys(this.activeCanvasObject).length) {
    // 			this.activeCanvasObject = {};
    // 			this.onObjectDeSelected();
    // 		}
    // 	});
    // 	this.canvasObject.on("object:added", () => {
    // 		this.onObjectAddOnCanvas(this.canvasObject.getObjects().length);
    // 	});
    // },
}


export default initializeCanvas;