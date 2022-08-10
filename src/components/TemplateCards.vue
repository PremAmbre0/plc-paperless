<template>
    <v-card class="mx-auto" max-width="344" outlined>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
        <v-card-actions>
            <v-card-title>
                Top western road trips
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
                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
            { title: 'Click Me1' },
            { title: 'Click Me2' },
            { title: 'Click Me3' },
            { title: 'Click Me4' },
        ],

    }),
}
</script>

<style>
</style>