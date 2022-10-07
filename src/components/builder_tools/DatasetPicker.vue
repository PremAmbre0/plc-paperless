<template>
    <div class="use-dataset-wrapper">
        <div class="select-dataset">
            <v-autocomplete v-model="selectedDatasetName" :items="datasetNames" dense clearable  outlined flat
                @click:clear="resetData()" label="select Dataset" placeholder="dataset"></v-autocomplete>
            <v-select v-if="datasetHeaders.length > 0" v-model="selectedHeader" :items="datasetHeaders" outlined
                label="select Header" placeholder="header">
            </v-select>
            <v-btn v-if="dataOfSelectedHeader.length > 0" @click="addDataDrivenText() ; resetData()">add
                dataset
            </v-btn>
            <v-list dense disabled v-if="dataOfSelectedHeader.length > 0">
                <v-list-item-title class="text-h6">{{
                selectedHeader
                }}</v-list-item-title>
                <v-list-item-group color="primary">
                    <v-list-item color=" #C1C7D0" v-for="(data, i) in dataOfSelectedHeader" :key="i">
                        <v-list-item-content>
                            <v-list-item-title v-text="data"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { eventBus } from '../../EventBus';
export default {
    data() {
        return {
            datasetsList: [],
            selectedDatasetName: "",
            selectedHeader: "",
            dataOfSelectedHeader: [],
            datasetId: "",
        }
    },
    computed: {
        datasetNames() {
            let array = [];
            this.datasetsList.forEach((dataset) => {
                array.push(dataset.name);
            });
            return array;
        },
        datasetHeaders() {
            let headers = [];
            this.datasetsList.forEach((dataset) => {
                if (dataset.name == this.selectedDatasetName) {
                    headers = dataset.headers;
                }
            });
            return headers;
        },
    },
    watch: {
        selectedHeader(newValue) {
            if (newValue.length > 0) {
                this.getDataOfSelectedHeader();
            }
        },
    },
    mounted() {
        this.getDatasets();
    },
    methods: {
        ...mapActions("datasets", ["getDatasetsList", "getDatasetData"]),
        getDatasets() {
            this.getDatasetsList({}).then((data) => {
                this.datasetsList = data.list;
            });
        },
        getselectedDataset() {
            let datasetToReturn = null;
            this.datasetsList.forEach((dataset) => {
                if (dataset.name == this.selectedDatasetName) {
                    datasetToReturn = dataset;
                }
            });
            console.log(datasetToReturn)
            return datasetToReturn;
        },
        getDataOfSelectedHeader() {
            let dataset = this.getselectedDataset();
            let id = dataset._id;
            this.datasetId = id;
            let rows;
            let dataOfSelectedHeader = [];
            this.getDatasetData({
                _id: id,
            }).then((response) => {
                rows = response.rows;
                rows.forEach((row) => {
                    if (row[this.selectedHeader]) {
                        dataOfSelectedHeader.push(row[this.selectedHeader]);
                    }
                });
                this.dataOfSelectedHeader = dataOfSelectedHeader;
            });
        },
        resetData() {
            this.selectedHeader = "";
            this.selectedDatasetName = "";
            this.dataOfSelectedHeader = [];
        },
        addDataDrivenText() {
            let payload = {
                'datasetId': this.datasetId,
                'dataField': this.selectedHeader,
                'type': "fromDataset",
                'txt': `${this.selectedDatasetName}.${this.selectedHeader}`,
            }
            eventBus.$emit('addText',payload);
            eventBus.$emit('openTextEditor');
        }
    }
}

</script>

<style lang="scss" scoped>
.use-dataset-wrapper {
    width: 100%;
    height: 100vh;
}

.select-dataset {
    margin-top: 3vh;
}
</style>