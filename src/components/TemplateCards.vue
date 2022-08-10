<template>
    <v-card class="mx-auto" width="100%" outlined elevation="4">
        <v-img :src="imageUrl" height="200px"></v-img>
        <v-card-actions> 
            <v-card-title>
                {{name}}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-expand-transition>
            <div>
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
                        <v-list-item v-for="(item, index) in items" :key="index">
                            <v-list-item-title>{{ item.option }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-expand-transition>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        items: [
            { option: 'Preview' },
            { option: 'Edit Template' },
            { option: 'Open in Builder' },
            { option: 'Download' },
        ],

    }),
    props:{
        name:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        }
    },
    mounted(){
        console.log(this.imageUrl);
    }
}
</script>

<style>
</style>