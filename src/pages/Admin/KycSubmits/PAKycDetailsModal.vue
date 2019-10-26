<template>
    <k-modal ref="kModalRef">
        <div slot="modal-header">
            <div class="text-h6">KYC Submits</div>
        </div>

        <div slot="modal-content">
            <div class="row">
                <div class="col-xs-12 col-sm-4 q-pa-sm" v-for="field in $options.text_fields" :key="field.key">
                    <k-field :label="field.label">
                        <q-input :value="''"
                                 placeholder="John"
                                 class="input"
                                 dense outlined stack-label>
                        </q-input>
                    </k-field>
                </div>
            </div>
        </div>

        <div slot="modal-footer">
            <q-btn flat label="Accept" @click="secondDialog = true" />
            <q-btn color="red" flat label="Reject" v-close-popup />
        </div>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField";
    import KModal from "../../../components/Admin/KModal"

    export default
    {
        name: "PAKycDetailsModal",
        components: {
            KField,
            KModal
        },
        props:
        {
           kyc_details: {}
        },
        data: () =>
        ({
            inception    : false,
            secondDialog : false
        }),
        methods:
        {
            showKycDetailsModal()
            {
                // Initialize data here
                this.$refs.kModalRef.showModal();
            }
        },
        text_fields:
        [
            {key: 'last_name'           , label: 'Last Name'},
            {key: 'first_name'          , label: 'First Name'},
            {key: 'middle_name'         , label: 'Middle Name'},
            {key: 'birthdate'           , label: 'Birhdate'},
            {key: 'state_city'          , label: 'State/City'},
            {key: 'country'             , label: 'Country'},
            {key: 'id_type'             , label: 'ID Type'},
            {key: 'id_number'           , label: 'ID Number'},
            {key: 'id_expiration_date'  , label: 'ID Expiry Date'},
        ]
    }
</script>

<style scoped>

</style>
