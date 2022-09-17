<template>
    <div class="use-dataset-wrapper">
        <v-btn class="close-btn" icon @click="$emit('closeSidepanel')">
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>
        <div class="select-dataset">
            <v-autocomplete v-model="selectedDatasetName" :items="datasetNames" dense clearable
                @click:clear="resetData()" label="select Dataset" placeholder="dataset"></v-autocomplete>
            <v-select v-if="datasetHeaders.length > 0" v-model="selectedHeader" :items="datasetHeaders" outlined filled
                label="select Header" placeholder="header">
            </v-select>
            <v-btn v-if="dataOfSelectedHeader.length > 0"
                @click="$emit('addDataDrivenText',`${selectedDatasetName}.${selectedHeader}`,'data_driven') ; resetData()">add dataset
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
export default {
    data() {
        return {
            datasetsList: [],
            selectedDatasetName: "",
            selectedHeader: "",
            dataOfSelectedHeader: [],
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
            let datasetToReturn;
            this.datasetsList.forEach((dataset) => {
                console.log(this.selectedDatasetName);
                if (dataset.name == this.selectedDatasetName) {
                    datasetToReturn = dataset;
                }
            });
            return datasetToReturn;
        },
        getDataOfSelectedHeader() {
            let dataset = this.getselectedDataset();
            let id = dataset._id;
            let rows;
            let dataOfSelectedHeader = [];
            this.getDatasetData({
                _id: id,
            }).then((response) => {
                rows = response.rows;
                console.log(rows);
                rows.forEach((row) => {
                    console.log(this.selectedHeader);
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
    }
}

</script>

<style lang="scss" scoped>
.use-dataset-wrapper {
    padding: 1rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.02rem solid $dark-one;
    position: relative;
}

.select-dataset {
    margin-top: 3vh;
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