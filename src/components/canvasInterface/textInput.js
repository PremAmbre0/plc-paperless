import { fabric } from "fabric";

const textInput = {
    addText(txt, type) {
        let id = this.generateUniqueId();
        let textAttributes = {
            id: id,
            top: this.canvasObject.height / 2,
            left: this.canvasObject.width / 2,
            fontSize: 40,
        }
        if (type == 'normal') {
            this.canvasObject.add(new fabric.IText(txt, {
                type,
                ...textAttributes
            }))
        }
        else {
            this.canvasObject.add(new fabric.Text(txt, {
                type,
                ...textAttributes
            }))
        }
        this.canvasObject.setActiveObject(this.activeCanvasObject);
        this.canvasObject.renderAll();
    },
    handleTextUpdate(data) {
        switch (data.attributeName) {
            case "color": {
                this.activeCanvasObject.set("fill", data.attributeValue);
                this.canvasObject.renderAll();
                break;
            }
            case "horizontalAlignment": {
                this.activeCanvasObject.set("textAlign", data.attributeValue);
                this.canvasObject.renderAll();
                break;
            }
            case "fontSize": {
                this.activeCanvasObject.set("fontSize", data.attributeValue);
                this.canvasObject.renderAll();
                break;
            }
            case "fontWeight": {
                this.activeCanvasObject.set("fontWeight", data.attributeValue);
                this.canvasObject.renderAll();
                break;

            }
            case "fontStyle": {
                this.activeCanvasObject.set("fontStyle", data.attributeValue);
                this.canvasObject.renderAll();
                break;
            }
            case "underline": {
               this.activeCanvasObject.set("underline", data.attributeValue);
               this.canvasObject.renderAll();
                break;
            }
            case "fontFamily": {
                console.log(data)
                this.activeCanvasObject.set("fontFamily", data.attributeValue);
               this.canvasObject.renderAll();
                break;
            }
        }
    }
}

export default textInput;