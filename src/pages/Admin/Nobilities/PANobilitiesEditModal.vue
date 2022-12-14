<template>
    <k-modal ref="kModalRef" card_section_height="80vh">
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

            <k-field label="Max Income Per Day">
                <q-input dense
                         outlined
                         type="number"
                         v-model="nobility.max_income"/>
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
            <q-btn flat label="Save" @click="confirmUpdateNobility()" />
            <q-btn flat label="Close" @click="$refs.kModalRef.hideModal()"/>
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
                title           : '',
                price           : 0,
                rank_order      : 0,
                required_direct : 0,
                required_rank   : 0,
                override_bonus  : 0,
                max_income      : 0,
                perks           : '',
                details         : '',
                badge_color     : ''
            },
            nobilities: []
        }),
        computed:
        {
            nobilityData()
            {
                return this.nobilities.map(n =>
                ({
                    label: n.title,
                    value: n.id
                }))
            }
        },
        methods:
        {
            showModal(nobility)
            {
                // Initialize nobilities options
                DB_NOBILITY.bindNobilities(this);

                // initialize data
                this.nobility = Object.assign({}, nobility);
                this.nobility.required_rank =
                {
                    label: nobility.required_rank_title,
                    value: nobility.required_rank_id
                };

                this.$refs.kModalRef.showModal();
            },
            confirmUpdateNobility()
            {
                const message = "Are you sure you want to update nobility ?";
                const callback = () => {
                    this.$_showPageLoading();

                    const nobility_data = Object.assign({}, this.nobility);

                    // remove required rank
                    delete nobility_data.required_rank;

                    // Prepare numbers
                    nobility_data.price           = Number(this.nobility.price);
                    nobility_data.rank_order      = Number(this.nobility.rank_order);
                    nobility_data.required_direct = Number(this.nobility.required_direct);
                    nobility_data.override_bonus  = Number(this.nobility.override_bonus);
                    nobility_data.max_income      = Number(this.nobility.max_income);

                    // Prepare required_rank_id and required_rank_title
                    nobility_data.required_rank_id    = this.nobility.required_rank ? this.nobility.required_rank.value : null;
                    nobility_data.required_rank_title = this.nobility.required_rank ? this.nobility.required_rank.label : null;

                    DB_NOBILITY.update(this.nobility.id, nobility_data)
                    .then(() =>
                    {
                        console.log('successfully update nobility.');
                        this.$_hidePageLoading();
                        this.$refs.kModalRef.hideModal();
                    })
                };

                this.$_showConfirmDialog(message, callback);

            }
        }
    }
</script>

<style scoped>

</style>
