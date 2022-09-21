import { fabric } from "fabric";

const textInput = {
    addText(txt, type) {
        console.log(this.canvasObject);
        let _id = this.generateUniqueId();
        let textAttributes = {
            _id: _id,
            top: this.canvasObject.height / 2,
            left: this.canvasObject.width / 2,
            fontSize: 40,
        }
        if (type == 'normal') {
            this.canvasObject.add(new fabric.IText(txt, textAttributes))
        }
        else {
            this.canvasObject.add(new fabric.Text(txt, textAttributes))
        }
        this.canvasObject.renderAll();
    },
}

export default textInput;