<template>
    <k-modal ref="kModalRef">
        <div slot="modal-header">
            <div class="text-h6">KYC Submits</div>
        </div>

        <div slot="modal-content">
            <div class="row">
                <div class="col-xs-12 col-sm-4 q-pa-sm" v-for="field in $options.text_fields" :key="field.key">
                    <k-field :label="field.label">
                        <q-input :value="kyc_details_value[field.key]"
                                 placeholder="John"
                                 class="input"
                                 readonly dense outlined stack-label>
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
            kyc_details_value:
            {
                last_name          : '',
                first_name         : '',
                middle_name        : '',
                birthdate          : null,
                state_city         : '',
                country            : '',
                id_type            : '',
                id_number          : '',
                id_expiration_date : null
            }
        }),
        methods:
        {
            showKycDetailsModal(kyc_details)
            {
                // Initialize data here
                this.setKycDetails(kyc_details);
                this.$refs.kModalRef.showModal();
            },
            setKycDetails(kyc_details)
            {
                const formatted_details =
                {
                    birthdate          : this.$_formatDate(kyc_details.birthdate.toDate()),
                    country            : kyc_details.country.name,
                    id_expiration_date : this.$_formatDate(kyc_details.id_expiration_date.toDate())
                };

                this.kyc_details_value = Object.assign({}, kyc_details, formatted_details);
            }
        },
        text_fields:
        [
            {key: 'last_name'           , label: 'Last Name'},
            {key: 'first_name'          , label: 'First Name'},
            {key: 'middle_name'         , label: 'Middle Name'},
            {key: 'birthdate'           , label: 'Birthdate'},
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
