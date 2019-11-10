<template>
    <k-modal ref="kModalRef"
             card_section_height="80vh"
             title="Add Nobility Modal"
             @close="hideAddNobilityModal">
        <div slot="modal-content">
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
                <q-select outlined
                          class="input"
                          dense
                          v-model="nobility.required_rank"
                          :options="nobilityData">
                </q-select>
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
        </div>

        <span slot="modal-footer">
            <q-btn flat label="Save" @click="addNobility()" />
        </span>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField"
    import KModal from "../../../components/Admin/KModal"

    import DB_NOBILITY from "../../../models/DB_NOBILITY"

    export default {
        name       : "PANobilitiesAddModal",
        components : {KModal, KField},
        data: () =>
        ({
            nobility:
            {
                title               : '',
                price               : 0,
                rank_order          : 0,
                required_direct     : 0,
                required_rank       : null,
                override_bonus      : 0,
                perks               : '',
                details             : '',
                badge_color         : ''
            },
            nobilities: []
        }),
        computed:
        {
            nobilityData()
            {
                return this.nobilities.map(n => ({
                    label: n.title,
                    value: n.id
                }))
            }
        },
        methods:
        {
            showModal()
            {
                this.clearData();
                this.$refs.kModalRef.showModal();
            },
            async addNobility()
            {
                const nobility_data = Object.assign({}, this.nobility);

                // remove required rank
                delete nobility_data.required_rank;

                // Prepare numbers
                nobility_data.price           = Number(this.nobility.price);
                nobility_data.rank_order      = Number(this.nobility.rank_order);
                nobility_data.required_direct = Number(this.nobility.required_direct );
                nobility_data.override_bonus  = Number(this.nobility.override_bonus );

                // Prepare required_rank_id and required_rank_title
                nobility_data.required_rank_id    = this.nobility.required_rank ? this.nobility.required_rank.value : null;
                nobility_data.required_rank_title = this.nobility.required_rank ? this.nobility.required_rank.label : null;

                this.$_showPageLoading();
                DB_NOBILITY.add(nobility_data)
                .then(() =>
                {
                    this.$_notify({message: 'sucessfully added new nobility.'});
                    this.$_hidePageLoading();
                    this.$refs.kModalRef.hideModal();
                })
            },
            clearData()
            {
                this.nobility =
                {
                    title               : '',
                    price               : 0,
                    rank_order          : 0,
                    required_direct     : 0,
                    required_rank       : null,
                    override_bonus      : 0,
                    perks               : '',
                    details             : '',
                    badge_color         : ''
                }
            },
            hideAddNobilityModal()
            {
                this.$refs.kModalRef.hideModal()
            }
        },
        mounted()
        {
            // Bind nobilities options
            DB_NOBILITY.bindNobilities(this)
        }
    }
</script>

<style scoped>

</style>
