<template>
    <div>
        <div class="template-container ">
            <template-cards v-for="template in templatesList" :key="template.createdOn" :name="template.name"
                :imageUrl="template.imageUrl"/>
        </div>
        <v-btn class="add-temp" fab dark color="indigo">
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
import TemplateCards from "../components/TemplateCards.vue";
export default {
    data() {
        return {
            templatesList:[
                { "_id": "62f6f8abbb1f9d06adf25962", "userId": "auth0|62dbaf48eaaaba65e88b1b86", "name": "test1", "imageUrl": "https://i.imgur.com/Z2hZFlJ.png", "createdOn": "2022-08-13T01:04:43.155Z", "updatedOn": "2022-08-13T01:04:43.155Z", "__v": 0 },
                { "_id": "62f6f8abbb1f9d06adf25962", "userId": "auth0|62dbaf48eaaaba65e88b1b86", "name": "test1", "imageUrl": "https://i.imgur.com/Z2hZFlJ.png", "createdOn": "2022-08-13T01:04:44.155Z", "updatedOn": "2022-08-13T01:04:43.155Z", "__v": 0 },
                { "_id": "62f6f8abbb1f9d06adf25962", "userId": "auth0|62dbaf48eaaaba65e88b1b86", "name": "test1", "imageUrl": "https://i.imgur.com/Z2hZFlJ.png", "createdOn": "2022-08-13T01:04:45.155Z", "updatedOn": "2022-08-13T01:04:43.155Z", "__v": 0 },
                { "_id": "62f6f8abbb1f9d06adf25962", "userId": "auth0|62dbaf48eaaaba65e88b1b86", "name": "test1", "imageUrl": "https://i.imgur.com/Z2hZFlJ.png", "createdOn": "2022-08-13T01:04:46.155Z", "updatedOn": "2022-08-13T01:04:43.155Z", "__v": 0 },
                { "_id": "62f6f8abbb1f9d06adf25962", "userId": "auth0|62dbaf48eaaaba65e88b1b86", "name": "test1", "imageUrl": "https://i.imgur.com/Z2hZFlJ.png", "createdOn": "2022-08-13T01:04:47.155Z", "updatedOn": "2022-08-13T01:04:43.155Z", "__v": 0 },
                ],
        }
    },
    // mounted() {
    //     console.log(typeof(this.templatesList))
    // },
    components: {
        TemplateCards
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