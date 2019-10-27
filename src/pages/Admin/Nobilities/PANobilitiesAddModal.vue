<template>
    <k-modal ref="kModalRef">
        <span slot="modal-content">
            <k-field label="Title">
               <q-input dense
                        outlined
                        type="text"
                        v-model="nobility.title"/>
            </k-field>

            <k-field label="Price">
               <q-input dense
                        outlined
                        type="number"
                        v-model="nobility.price"/>
            </k-field>

            <k-field label="Rank Order">
               <q-input dense
                        outlined
                        type="number"
                        v-model="nobility.rank_order"/>
            </k-field>

            <k-field label="Direct">
               <q-input dense
                        outlined
                        type="number"
                        v-model="nobility.required_direct"/>
            </k-field>

            <k-field label="Rank">
               <q-input dense
                        outlined
                        type="text"
                        v-model="nobility.required_rank"/>
            </k-field>

            <k-field label="Bonus">
               <q-input dense
                        outlined
                        type="number"
                        v-model="nobility.override_bonus"/>
            </k-field>

            <k-field label="Perks">
               <q-input dense
                        outlined
                        type="text"
                        v-model="nobility.perks"/>
            </k-field>

            <k-field label="Details">
               <q-input dense
                        outlined
                        type="textarea"
                        v-model="nobility.details"/>
            </k-field>

            <k-field label="Badge Color">
        <q-input dense
                 outlined
                 type="text"
                 v-model="nobility.badge_color"/>
            </k-field>
        </span>

        <span slot="modal-footer">
            <q-btn flat label="Save" @click="addNobility()" />
            <q-btn flat label="Close" @click="$refs.kModalRef.hideModal()"/>
        </span>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField"
    import KModal from "../../../components/Admin/KModal"

    import Nobility from "../../../models/DB_NOBILITY"

    export default {
        name       : "PANobilitiesAddModal",
        components : {KModal, KField},
        data: () =>
        ({
            nobility:
            {
                title           : '',
                price           : 0,
                rank_order      : 0,
                required_direct : 0,
                required_rank   : 0,
                override_bonus  : 0,
                perks           : '',
                details         : '',
                badge_color     : ''
            }
        }),
        methods:
        {
            showModal()
            {
                this.clearData();
                this.$refs.kModalRef.showModal();
            },
            addNobility()
            {
                this.$_showPageLoading();
                Nobility.add(this.nobility)
                    .then(() =>
                    {
                        console.log('successfully added new nobility.');
                        this.$_hidePageLoading();
                    })
            },
            clearData()
            {
                this.nobility =
                {
                    title           : '',
                    price           : 0,
                    rank_order      : 0,
                    required_direct : 0,
                    required_rank   : 0,
                    override_bonus  : 0,
                    perks           : '',
                    details         : '',
                    badge_color     : ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
