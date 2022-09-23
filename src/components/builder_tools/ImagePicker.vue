<template>
    <div class="input-image">
        <v-btn class="close-btn" icon @click="$emit('closeSidepanel')">
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>
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
    padding: 1rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.02rem solid $dark-one;
    position: relative;

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

    .close-btn {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        .v-icon {
            font-size: 2rem;
        }

    }
}
</style>