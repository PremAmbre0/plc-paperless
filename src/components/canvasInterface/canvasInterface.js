// import { fabric } from "fabric";
import initializeCanvas from "./initializeCanvas";

class CanvasInterface {
    constructor({canvasImageUrl, canvas,initialCanvasHeight,initialCanvasWidth}) {
        this.canvasImageUrl = canvasImageUrl;
        this.canvas = canvas;
        this.initialCanvasHeight = initialCanvasHeight;
        this.initialCanvasWidth = initialCanvasWidth;
        this.canvasObject = {}
        this.activeCanvasObject = {};

        this.generateUniqueId = () => {
            var arr = new Uint8Array(20);
            window.crypto.getRandomValues(arr);
            let dec2hex = (arr) => arr.toString(16).padStart(2, '0');
            return Array.from(arr, dec2hex).join('')
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
    ...initializeCanvas
});

export default CanvasInterface;