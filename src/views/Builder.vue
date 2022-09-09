<template>
    <div class="builder-wrapper">
        <v-navigation-drawer permanent height="100vh">
            <v-list dense nav ripple>
                <v-list-item v-for="tool in tools" :key="tool.tool" link>
                    <v-list-item-icon>
                        <v-icon>{{ tool.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ tool.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            templateData: null,
            tools: [
                { text: 'Add Text', icon: 'mdi-format-annotation-plus' },
                { text: 'Use Dataset ', icon: 'mdi-file-table' },
                { text: 'Add image', icon: 'mdi-image' },
            ],
        }
    },
    beforeMount() {
        this.getData();
    },
    mounted() {
        console.log('hi')
        this.setCurrentSection("Builder")
    },
    // computed:{
    //     ...mapGetters(['currentSection'])
    // },
    methods: {
        ...mapMutations(['setCurrentSection']),
        ...mapActions('templates', ['getTemplateById']),
        getData() {
            this.getTemplateById({
                id: this.$route.params.id
            }).then((response) => {
                this.templateData = response.data;
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.builder-wrapper {
    position: fixed;
    top: 4rem;
}
</style>