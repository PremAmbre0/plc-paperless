import { fabric } from "fabric";

const imageImput = {
    addImage(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (f) => {
            var data = f.target.result;
            let id = this.generateUniqueId();
            fabric.Image.fromURL(data, (img) => {
                let newDimensions = this.getMaintainedAspectRatio(img.height, img.width, this.canvasObject.height / 2, this.canvasObject.width / 2)
                let xScale = newDimensions.width / img.width;
                let yScale = newDimensions.height / img.height
                img.set({
                    id: id,
                    type: 'image',
                    top: (this.canvasObject.height - newDimensions.height) / 2,
                    left: (this.canvasObject.width - newDimensions.width) / 2,
                    angle: 0,
                    scaleX: xScale,
                    scaleY: yScale,
                })
                this.canvasObject.add(img,);
                this.canvasObject.setActiveObject(this.activeCanvasObject);
                this.canvasObject.renderAll();
            });
        };
        reader.readAsDataURL(file);
    },
    handleImageOpacity(data) {
        this.activeCanvasObject.set("opacity", data);
        this.canvasObject.renderAll();
    }
}

export default imageImput;