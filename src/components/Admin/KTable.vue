<template>
    <q-table :title="title"
             :data="data"
             :columns="columns"
             row-key="name"
             :loading="is_loading"
             class="ktable"
             :pagination.sync="tbl_pagination">

        <template v-slot:top>
            <slot name="table_top"></slot>
        </template>

        <q-tr slot="body" slot-scope="props">
            <slot :data="props.row" name="table_rows"></slot>
        </q-tr>
    </q-table>
</template>

<script>
    import "./KTable.scss"

    export default {
        name: "KTable",
        props: {
            title      : {type: String, default: ''},
            data       : {type: Array, default: () => []},
            columns    : {type: Array, default: () => []},
            pagination : {}
        },
        data: () =>
        ({
            is_loading: false,
            tbl_pagination : {rowsPerPage: 15}
        }),
        methods:
        {
            showLoading()
            {
                this.is_loading = true;
            },
            hideLoading()
            {
                this.is_loading = false;
            }
        }
    }
</script>

<style scoped>

</style>
