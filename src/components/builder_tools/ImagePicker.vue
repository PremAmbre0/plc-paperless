<template>
    <div class="input-image">
        <div class="image-opacity">
            <div class="image-opacity-input">
                <v-btn icon @click="decrementOpacity">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <div class="image-opacity-input--text-field">
                    <v-text-field v-model="opacity" outlined label="opacity" placeholder="opacity" hide-details></v-text-field>
                </div>
                <v-btn icon @click="incrementOpacity">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
        <v-slider v-model="opacity" dense color="#7569bb" track-color="#a9a1d5" thumb-label min="0" max="10" step="0.1"></v-slider>
    </div>
</template>
<script>
import { eventBus } from '../../EventBus';
export default{
    data() {
        return {
            opacity:10,
        }
    },
    watch:{
        opacity(newVal){
            let data = (10/100)*newVal;
            this.updateIamgeOpacity(data.toFixed(2));
        }
    },
    methods: {
        updateIamgeOpacity(data){
            eventBus.$emit('updateImageOpacity',data);
        },
        incrementOpacity(){
            if(this.opacity<10){
                this.opacity+=1
            }
        },
        decrementOpacity(){
            if(this.opacity>0){
                this.opacity-=1
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.input-image {
    width: 100%;
    height: 100vh;

    .image-opacity {
        margin-top: 3vh;

        &-input {
            height: 100%;
            width: 20vw;
            padding: 1rem;
            display: flex;
            align-items: center;

            &--text-field {
                width: 60%;
            }

            .v-icon {
                font-size: 2rem;
            }
        }
    }
}
</style>