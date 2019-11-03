<template>
    <k-modal ref="kModalRef" card_width="800px" card_section_height="50vh">
        <div slot="modal-header">
            <div class="text-h6">Referrals</div>
        </div>

        <div slot="modal-content">
            <k-table :data="referralsData" :columns="$options.columns" class="text-center">
                <template slot="table_top_left">
                    <q-input dense
                             placeholder="Search"
                             v-model="search_text">
                        <template v-slot:append>
                            <q-btn flat round color="primary" icon="search" />
                        </template>
                    </q-input>
                </template>

                <template slot="table_rows" slot-scope="referral">
                    <q-td key="name">{{ referral.data.name }}</q-td>
                    <q-td key="date_registered">{{ referral.data.date_registered }}</q-td>
                    <q-td key="nobility">{{ referral.data.nobility }}</q-td>
                </template>
            </k-table>
        </div>
        <div slot="modal-footer">
            <q-btn flat color="grey" label="Close" @click="hideUsersReferralsModal"/>
        </div>
    </k-modal>

</template>

<script>
    import KModal from '../../../components/Admin/KModal'
    import KTable from '../../../components/Admin/KTable'

    import DB_USER from '../../../models/DB_USER'

    export default {
        name: "PAUsersReferralsModal",
        components: {KModal, KTable},
        data: () =>
        ({
            referrals   : [],
            search_text : ''
        }),
        computed:
        {
            referralsData()
            {
                return this.referrals.map(referral =>
                {
                    return {
                        name            : referral.full_name,
                        date_registered : this.$_formatDate(referral.created_at.toDate(), 'MMMM DD, YYYY'),
                        nobility        : referral.nobility_info.title
                    }
                })
            }
        },
        methods:
        {
            async showUsersReferralsModal(referral_code)
            {
                this.$refs.kModalRef.showModal();

                // Bind referrals
                await DB_USER.bindReferrals(this, referral_code);
            },
            hideUsersReferralsModal()
            {
                this.$router.go(-1)
            }
        },
        mounted()
        {
            this.showUsersReferralsModal(this.$route.params.referral_code)
        },
        columns:
        [
            { name: 'name'            , label: 'Name'             , field: 'name'            , align: 'center', sortable: true},
            { name: 'date_registered' , label: 'Date Registered'  , field: 'date_registered' , align: 'center', sortable: true},
            { name: 'nobility'        , label: 'Nobility'         , field: 'nobility'        , align: 'center', sortable: true},
        ]
    }
</script>

<style scoped>

</style>
