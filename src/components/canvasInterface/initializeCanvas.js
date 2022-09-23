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
        this.initialiseFabricListners();
    },
    initialiseFabricListners() {
        this.canvasObject.on("selection:created", () => {
            this.activeCanvasObject = this.canvasObject.getActiveObject()
        }); 
        this.canvasObject.on("selection:updated", () => {
            this.activeCanvasObject = this.canvasObject.getActiveObject()

        });
        this.canvasObject.on("selection:cleared", () => {
            this.activeCanvasObject = {}

        });
        this.canvasObject.on("object:added", () => {
            let canvasObjs = this.canvasObject.getObjects()
            let lastIndex = canvasObjs.length - 1
            this.allFabricObjects.push(canvasObjs[lastIndex]);
            this.activeCanvasObject = canvasObjs[lastIndex];
        });
    }
}


export default initializeCanvas;