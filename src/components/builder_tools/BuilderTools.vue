<template>
    <div class="buildertools-wrapper" v-if="selectedTool">
        <v-btn class="close-btn" icon @click="selectedTool = ''">
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>
        <component :is="selectedTool"></component>
    </div>
</template>
<script>
import DatasetPicker from './DatasetPicker.vue';
import FontHandler from './FontHandler.vue';
import ImagePicker from './ImagePicker.vue';
import { eventBus } from '../../EventBus';

export default {
    data() {
        return {
            selectedTool: "",
        }
    },
    components: {
        ImagePicker,
        FontHandler,
        DatasetPicker,
    },
    beforeMount() {
        this.InitializeListeners();
    },
    methods: {
        InitializeListeners() {
            eventBus.$on('openTextEditor', () => {
                this.selectedTool = "FontHandler";
            }); eventBus.$on('openImageEditor', () => {
                this.selectedTool = "ImagePicker";
            }); eventBus.$on('openDatasetPicker', () => {
                this.selectedTool = "DatasetPicker";
            });
        },
    }
}

</script>

<style lang="scss" scoped>
.buildertools-wrapper {
    padding: 2rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.02rem solid $dark-one;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    .v-icon {
        font-size: 2rem;
    }

}
</style>