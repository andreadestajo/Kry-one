<template>
    <q-table :title="title"
             :data="data"
             :columns="columns"
             row-key="name"
             :pagination="{rowsPerPage: 0}"
             hide-bottom>


        <template v-slot:top>
            <slot name="table_top"></slot>
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
