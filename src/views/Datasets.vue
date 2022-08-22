<template>
    <div>
        <v-container tag="div" fluid>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-list subheader two-line>
                <v-list-item v-ripple v-for="dataset in datasetsList" :key="dataset._id" @click="setSelectedDataset(dataset)">
                    <v-list-item-avatar>
                        <v-icon class="grey lighten-1" dark>
                            mdi-file-table
                        </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="dataset.name"></v-list-item-title>

                        <v-list-item-subtitle v-text="dataset.createdOn"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-menu>
                        <template v-slot:activator="{ on: menu, attrs }">
                            <v-tooltip bottom z-index="-100">
                                <template v-slot:activator="{ on: tooltip }">
                                    <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                            </v-tooltip>
                        </template>
                        <v-list rounded dense>
                            <v-list-item v-for="(option, index) in options" :key="index">
                                <v-list-item-title @click="eventHandler(option.value, dataset._id)">{{ option.value }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item>
            </v-list>
        </v-container>
        <dialog-form :datasetData="selectedDataset" @reloadData="getData"> </dialog-form>
        <v-btn class="add" fab dark color="indigo" @click="removeselectedDataset">
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
        <v-overlay :value="showOverlayLoader">
        <v-progress-circular indeterminate color="#5243AA" size="70"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import DialogForm from '../components/DialogForm.vue';
export default {
    data() {
        return {
            datasetsList: null,
            options: [
                { value: 'View' },
                { value: 'Delete' },
                { value: 'Download' },
            ],
            mode:'',
            selectedDataset: {},
        }
    },
    components:{
        DialogForm
    },
    computed: {
        ...mapGetters(['showOverlayLoader'])
    },
    async created() {
        this.getData();
    },
    methods: {
        ...mapActions('datasets', ['getDatasetsList', 'deleteDataset']),
        ...mapMutations(['openDialogForm',]),
        eventHandler(option, id) {
            if (option == 'Delete') {
                this.deleteDataset({ _id: id })
                    .then((response) => {
                        this.getData();
                        console.log(response)
                    })
            }
        },
        getData() {
            this.getDatasetsList({
            }).then((data) => {
                this.datasetsList = data.list
            });
        },
        setSelectedDataset(dataset) {
            this.selectedDataset.datasetName = dataset.name;
            this.selectedDataset.headers = dataset.headers;
            this.selectedDataset.id = dataset._id;
            this.selectedDataset.mode = 'edit'
            this.openDialogForm()
        },
        removeselectedDataset() {
            this.selectedDataset.datasetName = '';
            this.selectedDataset.headers = []
            this.selectedDataset.id = '';
            this.selectedDataset.mode = 'new'
            this.openDialogForm()
        },
    },
}


</script>
<style lang="scss" scoped>
.add {
    position: fixed;
    right: 5%;
    bottom: 3%
}
</style>