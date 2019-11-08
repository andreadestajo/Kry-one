<template>
    <q-page class="q-pa-lg">
        <k-header icon="people" detail="Lorem ipsum dolor sit amet">Promotions</k-header>

        <k-table ref="kTableRef" :data="promotions_data" :columns="$options.columns" class="text-center">
            <template slot="table_top">
                <q-input dense class="full-width"
                         placeholder="Search by email"
                         @keyup.enter="searchUser"
                         v-model="search_text">
                    <template v-slot:append>
                        <q-btn flat round color="primary" icon="search" @click="searchUser"/>
                    </template>
                </q-input>
            </template>

            <template slot="table_rows" slot-scope="promotion">
                <q-td key="name">{{ promotion.data.name }}</q-td>
                <q-td key="previous_nobility">{{ promotion.data.previous_nobility }}</q-td>
                <q-td key="promoted_nobility">{{ promotion.data.promoted_nobility }}</q-td>
                <q-td key="date_promoted">{{ promotion.data.date_promoted}}</q-td>
                <q-td key="time_promoted">{{ promotion.data.time_promoted}}</q-td>
            </template>
        </k-table>

    </q-page>
</template>

<script>
    import KHeader                 from '../../../components/Admin/KHeader'
    import KTable                  from '../../../components/Admin/KTable'

    import DB_PROMOTION   from '../../../models/DB_PROMOTIONS'


    export default {
        name: "PAUsers",
        components:
        {
            KHeader,
            KTable,
        },
        data: () =>
        ({
            search_text : '',
            promotions       : [],
            promotions_data  : []
        }),
        methods:
        {
            async searchUser()
            {
                // TODO filters
                this.$refs.kTableRef.showLoading();
                const params = {};

                if(this.search_text)
                {
                    params.search_text = this.search_text.trim()
                }

                await DB_PROMOTION.bindAllPromotions(this, params);
            }
        },
        async mounted()
        {
            this.$refs.kTableRef.showLoading();
            await DB_PROMOTION.bindAllPromotions(this);
        },
        watch:
        {
            promotions(promotions)
            {
                if(!promotions.length) {return 0}

                this.$refs.kTableRef.showLoading();
                const promotions_data = [];

                promotions.forEach(p =>
                {
                    promotions_data.push
                    ({
                        name              : p.user_full_name,
                        previous_nobility : p.previous_nobility_title,
                        promoted_nobility : p.promoted_nobility_title,
                        date_promoted     : this.$_formatDate(p.created_at.toDate(), 'MMMM DD, YYYY'),
                        time_promoted     : this.$_formatDate(p.created_at.toDate(), 'hh:mm A'),
                    })
                });

                this.promotions_data = promotions_data;
                this.$refs.kTableRef.hideLoading();
            }
        },
        columns:
        [
            { name: 'name'               , label: 'Name'              , field: 'Name'              , align: 'center', sortable: true},
            { name: 'previous_nobility'  , label: 'Previous Nobility' , field: 'previous_nobility' , align: 'center', sortable: true},
            { name: 'promoted_nobility'  , label: 'Promoted Nobility' , field: 'promoted_nobility' , align: 'center', sortable: true},
            { name: 'date_promoted'      , label: 'Date Promoted'     , field: 'date_promoted'     , align: 'center', sortable: true},
            { name: 'time_promoted'      , label: 'Time'              , field: 'time_promoted'     , align: 'center', sortable: true},
        ]
    }
</script>

<style scoped>

</style>
