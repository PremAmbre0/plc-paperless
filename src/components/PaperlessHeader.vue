<template>
    <div>
        <v-app-bar app color="#5243AA" dark height="60%" width="100%">

            <v-toolbar-title>Paperless</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon @click="signOutFromPaperless">mdi-logout</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions('auth', ['signOut']),
        signOutFromPaperless(){
            this.signOut()
            this.$router.replace('/auth')
        }
    }
}

</script>