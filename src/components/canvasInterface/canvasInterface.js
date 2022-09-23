// import { fabric } from "fabric";
import initializeCanvas from "./initializeCanvas";
import textInput from "./textInput";
import imageImput from "./imageInput";
import { v4 as uuidv4 } from 'uuid';

class CanvasInterface {
    constructor({ canvasImageUrl, canvas, initialCanvasHeight, initialCanvasWidth }) {
        this.canvasImageUrl = canvasImageUrl;
        this.canvas = canvas;
        this.initialCanvasHeight = initialCanvasHeight;
        this.initialCanvasWidth = initialCanvasWidth;
        this.canvasObject = {};
        this.allFabricObjects=[];
        this.activeCanvasObject = {};

        this.generateUniqueId = () => {
            return uuidv4();
        };
        this.getMaintainedAspectRatio = (imgHeight, imgWidth, canvasHeight, canvasWidth) => {
            let widthRatio = canvasWidth / imgWidth;
            let HeightRatio = canvasHeight / imgHeight;
            let ratio = widthRatio < HeightRatio ? widthRatio : HeightRatio;
            return {
                height: Math.round(imgHeight * ratio),
                width: Math.round(imgWidth * ratio),
            }
        }
    }
}

Object.assign(CanvasInterface.prototype, {
    ...initializeCanvas,
    ...textInput,
    ...imageImput,
});

export default CanvasInterface;