<template>
    <q-table :title="title"
             :data="data"
             :columns="columns"
             row-key="name"
             :pagination="{rowsPerPage: 0}"
             hide-bottom>
        <template v-slot:top-left>
            <slot name="table_top_left"></slot>
        </template>

        <template v-slot:top-right>
            <slot name="table_top_right"></slot>
        </template>

        <q-tr slot="body" slot-scope="props">
            <slot :data="props.row" name="table_rows"></slot>
        </q-tr>
    </q-table>
</template>

<script>
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
        })
    }
</script>

<style scoped>

</style>
