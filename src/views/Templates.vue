<template>
    <div>
        <div class="template-container">
            <template-cards v-for="template in templatesList" :key="template.createdOn" :name="template.name"
                :imageUrl="template.imageUrl" :id="template._id" @click.native=" setSelectedTemplate(template);" @deleteTemp="deleteTemp"/>
        </div>
        <dialog-form :templateName="selectedTemplate.templateName" :imageUrl="selectedTemplate.imageUrl" :mode="mode" :id="selectedTemplate.id"></dialog-form>
        <v-btn class="add-temp" fab dark color="indigo" @click="removeselectedTemplate()">
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import TemplateCards from "../components/TemplateCards.vue";
import DialogForm from "../components/DialogForm.vue"
export default {
    data() {
        return {
            selectedTemplate: {
                templateName: '',
                imageUrl: '',
                id:''
            },
            mode:'',
            templatesList: [],
        }
    },
    components: {
        TemplateCards,
        DialogForm
    },
    async created() {
        this.getData();
    },
    methods: {
        ...mapActions('templates', ['getTemplatesList','deleteTemplate']),
        ...mapMutations(["openLoaderDialog", "closeLoaderDialog", "openDialogForm"]),
        getData() {
            this.openLoaderDialog();
            this.getTemplatesList({
                pageSize: 100,
                pageNo: 1,
            }).then((data) => {
                this.templatesList = data.list
                this.closeLoaderDialog();
            });
        },
        setSelectedTemplate(template) {
            this.selectedTemplate.templateName = template.name;
            this.selectedTemplate.imageUrl = template.imageUrl;
            this.selectedTemplate.id = template._id;
            this.mode = 'edit'
            this.openDialogForm()
        },
        removeselectedTemplate(){
            this.selectedTemplate.templateName = '';
            this.selectedTemplate.imageUrl = '';
            this.selectedTemplate.id = '';
            this.mode = 'new'
            this.openDialogForm()
        },
        deleteTemp(id){
            if(window.confirm("Are you sure you want to deleteTemplate?")){
                this.deleteTemplate({
                    id: id,
                })
                this.getData()
            }
        },

    },
}

</script>

<style lang="scss" scoped>
.template-container {
    max-width: 80vw;
    margin: 0 auto;
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 2%;
    grid-template-columns: repeat(2, 48%);
    margin-top: 7vh;
}

.add-temp {
    position: fixed;
    right: 5%;
    bottom: 3%
}

@media(max-width:500px) {
    .template-container {
        grid-row-gap: 2%;
        grid-template-columns: 98%;
    }
}

@media(min-width:750px) {
    .template-container {
        grid-column-gap: 2%;
        grid-row-gap: 2%;
        grid-template-columns: repeat(3, 31.33%);

    }
}

@media(min-width:1000px) {
    .template-container {
        grid-column-gap: 2%;
        grid-row-gap: 2%;
        grid-template-columns: repeat(4, 23%);
    }
}

@media(min-width:1440px) {
    .template-container {
        grid-column-gap: 2%;
        grid-row-gap: 2%;
        grid-template-columns: repeat(5, 18%);
    }
}
</style>