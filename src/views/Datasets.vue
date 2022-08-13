<template>
    <div>
        Datasets Section
        <div>
            {{ data }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'; ``


export default {
    data() {
        return {
            data: null
        }
    },
    async created() {
        this.getData();
    },
    methods: {
        ...mapActions('datasets', ['getDatasetsList']),
        ...mapMutations(["openLoaderDialog", "closeLoaderDialog"]),
        getData() {
            this.openLoaderDialog();
            this.getDatasetsList({
                // searchText: 'test1',
                // pageSize: 100,
                // pageNo: 1,
            }).then((data) => {
                this.data = data.list
                this.closeLoaderDialog();
            });
        },

    },
}


</script>