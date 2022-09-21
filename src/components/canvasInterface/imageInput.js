import { fabric } from "fabric";

const imageImput = {
    addImage(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (f) => {
            var data = f.target.result;
            console.log(data)
            let _id = this.generateUniqueId();
            fabric.Image.fromURL(data, (img) => {
                let newDimensions = this.getMaintainedAspectRatio(img.height, img.width, this.canvasObject.height / 2, this.canvasObject.width / 2)
                let xScale = newDimensions.width / img.width;
                let yScale = newDimensions.height / img.height
                img.set({
                    _id: _id,
                    top: (this.canvasObject.height - newDimensions.height) / 2,
                    left: (this.canvasObject.width - newDimensions.width) / 2,
                    angle: 0,
                    scaleX: xScale,
                    scaleY: yScale,
                })
                this.canvasObject.add(img,).renderAll();
            });
        };
        reader.readAsDataURL(file);

    }
}

export default imageImput;