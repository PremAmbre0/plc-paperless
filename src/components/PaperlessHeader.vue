<template>
    <div>
        <v-app-bar app color="#5243AA" dark height="60px" width="100%">

            <v-toolbar-title>Paperless</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>

            <v-btn icon @click="logOut">
                <v-icon>mdi-logout</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <v-toolbar class="navbar" flat dense height="10" width="100%">
            <v-select dense hide-selected v-model="selectedSection" class="selectdropdown" :items="sections" solo
                @change="Navigate(selectedSection)">
            </v-select>

            <v-spacer></v-spacer>
            <v-text-field class="search-field">
                <v-btn icon slot="append">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-text-field>
        </v-toolbar>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedSection: 'Templates',
            sections: ['Templates', 'Datasets', 'Jobs', 'Dashboard']
        }
    },
    methods: {
        async logOut() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
        Navigate(section) {
            if (section == 'Templates') {
                this.$router.replace('/templates')
            }
            if (section == 'Datasets') {
                this.$router.replace('/datasets')
            }
            if (section == 'Jobs') {
                this.$router.replace('/jobs')
            }
            if (section == 'Dashboard') {
                this.$router.replace('/dashboard')
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.navbar {
    margin-top: 7.5rem
}

.selectdropdown {
    width: 10rem;
}

.search-field {
    margin-left: 3rem
}
</style>