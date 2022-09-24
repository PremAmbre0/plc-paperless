// import { fabric } from "fabric";
import initializeCanvas from "./initializeCanvas";
import { fabric } from "fabric";
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
        this.allFabricObjects = [];
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
        };
        this.getStyles = (obj) => {
            return {
                "fontFamily": obj.fontFamily,
                "fontSize": obj.fontSize,
                "fontWeight": obj.fontWeight,
                "fontStyle": obj.fontStyle,
                "underline": obj.underline,
                "horizontalAlignment": obj.textAlign,
            }
        };
        this.getPosition = (obj) => {
            let matrix = obj.calcTransformMatrix()
            let options = fabric.util.qrDecompose(matrix);
            return {
                "top": obj.top,
                "left": obj.left,
                "scaleX": options.scaleX,
                "scaleY": options.scaleY,
                "angle": options.angle,

            }
        };
        this.getImagePaylaod = (obj) => {
            let attributes ={
                'opacity': obj.opacity,
                'scaleX': obj.scaleX,
                'scaleY': obj.scaleY,
                'angle': obj.angle,
            }
            let position ={
                'top': obj.top,
                'left': obj.left,
            }

            return {
                "url": obj.url,
                "attributes": attributes,
                "position":position
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