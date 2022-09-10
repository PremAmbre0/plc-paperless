<template>
    <div class="builder-wrapper">
        <v-navigation-drawer permanent height="100vh" width="20vw">
            <v-list dense nav ripple width="20vw">
                <v-list-item v-for="tool in tools" :key="tool.tool" @click="selectedTool = tool.text">
                    <v-list-item-icon>
                        <v-icon>{{ tool.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ tool.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <div class="use-dataset-wrapper" v-if="selectedTool =='Use Dataset'">
            <v-autocomplete v-model="selectedDatasetName" :items="datasetNames" dense clearable
                @click:clear="resetData()" label="select Dataset" placeholder="dataset"></v-autocomplete>
            <v-select v-if="datasetHeaders.length > 0" v-model="selectedHeader" :items="datasetHeaders" outlined filled
                label="select Header" placeholder="header">
            </v-select>
            <v-list dense disabled>
                <v-list-item-title class="text-h6">{{selectedHeader}}</v-list-item-title>
                <v-list-item-group color="primary">
                    <v-list-item color=" #C1C7D0" v-for="(data, i) in dataOfSelectedHeader" :key="i">
                        <v-list-item-content>
                            <v-list-item-title v-text="data"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </div>
        <div class="text-editor-wrapper" v-if="selectedTool =='Add Text'">
            <div class="text-editor">
                <div class="text-editor-setfont">
                    <v-select v-model="fontFamily" :items="fontFamilyList" item-text="text" item-value="value" dense
                        outlined prepend-icon="mdi-format-text" label="Font">
                    </v-select>
                </div>
                <div class="text-editor-setfontsize">
                    <div class="text-editor-setfontsize-label">Set Font Size</div>
                    <v-select v-model="fontSize" :items="fontSizeList" item-text="text" item-value="value" dense
                        outlined label="Font Size" placeholder="Select fontsize-">
                    </v-select>
                </div>

                <div class="text-editor-setalignment">
                    <v-btn-toggle v-model="horizontalAlignment">
                        <v-btn value="left" icon tile small>
                            <v-icon small>mdi-format-align-left</v-icon>
                        </v-btn>
                        <v-btn value="center" icon tile small>
                            <v-icon small>mdi-format-align-center</v-icon>
                        </v-btn>
                        <v-btn value="right" icon tile small>
                            <v-icon small>mdi-format-align-right</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <div class="text-editor-setfontstyle">
                    <div class="text-editor-setfontstyle-label">Font Style</div>
                    <v-btn icon tile small :class="{ selected: fontWeight === 'bold' }">
                        <v-icon small>mdi-format-bold</v-icon>
                    </v-btn>
                    <v-btn icon tile small :class="{ selected: fontStyle === 'italic' }">
                        <v-icon small>mdi-format-italic</v-icon>
                    </v-btn>
                    <v-btn icon tile small :class="{ selected: underline }">
                        <v-icon small>mdi-format-underline</v-icon>
                    </v-btn>
                </div>
                <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="color" hide-details class="ma-0 pa-0" outlined v-bind="attrs"
                                v-on="on" label="color">
                            </v-text-field>
                        </template>
                        <v-color-picker v-model="color" flat />
                    </v-menu>
                </div>
            </div>
        </div>
        <div class="add-image-wrapper" v-if="selectedTool =='Add image'">
            <v-file-input truncate-length="15"></v-file-input>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            selectedTool: 'Add Text',
            templateData: null,
            datasetsList: [],
            selectedDatasetName: '',
            selectedHeader: '',
            dataOfSelectedHeader: [],
            tools: [
                { text: 'Add Text', icon: 'mdi-format-annotation-plus' },
                { text: 'Use Dataset', icon: 'mdi-file-table' },
                { text: 'Add image', icon: 'mdi-image' },
            ],
            fontSizeList: [],
            fontFamilyList: [
                {
                    text: "Arial",
                    value: "Arial, Helvetica, sans-serif",
                },
                {
                    text: "Arial Black",
                    value: "'Arial Black', Gadget, sans-serif",
                },
                {
                    text: "'Comic Sans MS'",
                    value: "'Comic Sans MS', cursive, sans-serif",
                },
                {
                    text: "Impact",
                    value: "Impact, Charcoal, sans-serif",
                },
                {
                    text: "'Lucida Sans Unicode'",
                    value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                },
                {
                    text: "Tahoma",
                    value: "Tahoma, Geneva, sans-serif",
                },
                {
                    text: "'Trebuchet MS'",
                    value: "'Trebuchet MS', Helvetica, sans-serif",
                },
                {
                    text: "Verdana",
                    value: "Verdana, Geneva, sans-serif",
                },
                {
                    text: "Comic Sans",
                    value: "Comic Sans, Comic Sans MS, cursive",
                },
                {
                    text: "'Lucida Console'",
                    value: "'Lucida Console', Monaco, monospace",
                },
                {
                    text: "'Courier New'",
                    value: "'Courier New', Courier, monospace",
                },
                {
                    text: "'Allura'",
                    value: "'Allura', cursive",
                },
            ],
            horizontalAlignment: 0,
            color: "#000",
            menu: false,
            fontSize: 48,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: "normal",
            fontStyle: "normal",
            underline: false,
        }
    },
    updated() {
        console.log(this.selectedHeader)
        console.log(this.dataOfSelectedHeader)
    },
    beforeMount() {
        this.getTemplateData();
        this.getDatasets();
    },
    mounted() {
        this.generateFontSizeList();
        this.setCurrentSection("Builder")
    },
    computed: {
        datasetNames() {
            let array = [];
            this.datasetsList.forEach(dataset => {
                array.push(dataset.name)
            })
            return array
        },
        datasetHeaders() {
            let headers = []
            this.datasetsList.forEach(dataset => {
                if (dataset.name == this.selectedDatasetName) {
                    headers = dataset.headers
                }
            })
            return headers
        }
    },
    watch: {
        selectedHeader(newValue) {
            if (newValue.length > 0) {
                this.getDataOfSelectedHeader();
            }
        }
    },
    methods: {
        ...mapMutations(['setCurrentSection']),
        ...mapActions('templates', ['getTemplateById']),
        ...mapActions('datasets', ['getDatasetsList', 'getDatasetData']),
        getTemplateData() {
            this.getTemplateById({
                id: this.$route.params.id
            }).then((response) => {
                this.templateData = response.data;
            });
        },
        getDatasets() {
            this.getDatasetsList({
            }).then((data) => {
                this.datasetsList = data.list
            });
        },
        getselectedDataset() {
            let datasetToReturn;
            this.datasetsList.forEach(dataset => {
                console.log(this.selectedDatasetName)
                if (dataset.name == this.selectedDatasetName) {
                    datasetToReturn = dataset
                }
            })
            return datasetToReturn
        },
        getDataOfSelectedHeader() {
            let dataset = this.getselectedDataset();
            let id = dataset._id;
            let rows;
            let dataOfSelectedHeader = [];
            this.getDatasetData({
                _id: id
            }).then((response) => {
                rows = response.rows
                console.log(rows)
                rows.forEach((row) => {
                    console.log(this.selectedHeader)
                    if (row[this.selectedHeader]) {
                        dataOfSelectedHeader.push(row[this.selectedHeader])
                    }
                })
                this.dataOfSelectedHeader = dataOfSelectedHeader
            })
        },
        generateFontSizeList() {
            for (let i = 10; i <= 400; i += 10) {
                this.fontSizeList.push({
                    text: i + " px",
                    value: i,
                });
            }
        },
        resetData() {
            this.selectedHeader = '';
            this.selectedDatasetName = '';
            this.dataOfSelectedHeader = [];
        }
    },
}
</script>
<style lang="scss" scoped>
.builder-wrapper {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 4rem;
    display: flex;
}

.use-dataset-wrapper {
    padding: 1rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.01rem solid $light-two ;
}

.add-image-wrapper {
    padding: 1rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.01rem solid $light-two ;
}

.text-editor {
    padding: 2rem;
    width: 20vw;
    height: 100vh;
    border-right: 0.01rem solid $light-two ;


    &-setfontsize {
        &-label {
            font-size: medium;
        }
    }

    &-setalignment {
        .v-btn--icon {
            height: 2rem;
            width: 3.5rem;
        }

        margin-bottom: 1.4rem;
    }

    &-setfontstyle {
        margin-bottom: 1.4rem;

        &-label {
            font-size: medium;
        }

        .v-btn {
            height: 2rem;
        }
    }
}
</style>