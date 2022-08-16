<template>
    <div @dragover.prevent @drop.stop.prevent="onDrop">
        <label for="file-input" class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${previewImage ? previewImage : imageUrl})` }"></label>
        <input ref="fileInput" type="file" accept="image/*" id="file-input" @input="pickFile">
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            previewImage: null
        };
    },
    props: {
        imageUrl: {
            type: String,
        }
    },
    methods: {
        showPreviewImage(file) {
            console.log(file)
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    this.previewImage = e.target.result
                }
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
            }
        },
        pickFile() {
            let input = this.$refs.fileInput
            let file = input.files
            this.showPreviewImage(file);
        },
        onDrop(event) {
            const file = event.dataTransfer.files;
            this.showPreviewImage(file);
        }
    }
}
</script>
 
<style>
.imagePreviewWrapper {
    display: block;
    background-color: lightgrey;
    max-width: 50vw;
    min-height: 20rem;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}

input[type="file"] {
    display: none;
}
</style>