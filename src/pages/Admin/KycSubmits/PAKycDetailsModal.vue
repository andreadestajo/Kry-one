<template>
    <k-modal ref="kModalRef" card_width="800px" card_section_height="70vh">
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

                <div class="col-xs-12 col-sm-4 q-pa-sm" v-for="field in $options.img_fields" :key="field.key">
                    <k-field  :label="field.label">
                            <img :src="kyc_details_value[field.key]"
                                 width="230px">
                    </k-field>
                </div>
            </div>
        </div>

        <div slot="modal-footer">
            <span v-if="kyc_details_value.status === 'pending'">
                <q-btn flat label="Accept" @click="confirmSubmit(1)" />
                <q-btn color="red" flat label="Reject" @click="confirmSubmit()"/>
            </span>

            <q-btn color="grey" flat label="Close" @click="$refs.kModalRef.hideModal()"/>
        </div>
    </k-modal>
</template>

<script>
    import KField from "../../../components/Admin/KField";
    import KModal from "../../../components/Admin/KModal"
    import PAKycReasonModal  from  "./PAKycReasonModal";
    import DB_KYC_VERIFICATION from "../../../models/DB_KYC_VERIFICATION"
    import DB_USER from "../../../models/DB_USER";
    import { FN_KYC } from "../../../references/refs_functions";
    import { fbCall } from '../../../utilities/Callables';


    export default
    {
        name: "PAKycDetailsModal",
        components:
        {
            KField,
            KModal,
            PAKycReasonModal
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
                this.setKycDetails(kyc_details);
                this.$refs.kModalRef.showModal();
            },
            closeKycDetailsModal()
            {
                this.$refs.kModalRef.hideModal();
            },
            setKycDetails(kyc_details)
            {
                const formatted_details =
                {
                    birthdate          : this.$_formatDate(kyc_details.birthdate.toDate()),
                    country            : kyc_details.country.name,
                    id_expiration_date : this.$_formatDate(kyc_details.id_expiration_date.toDate()),
                    id                 : kyc_details.id
                };

                this.kyc_details_value = Object.assign({}, kyc_details, formatted_details);
            },
            showReasonModal()
            {
                this.$emit('reasonModalOpenEmit');
            },
            confirmSubmit(is_accepted)
            {
                const message  = `Are you sure you want to ${is_accepted ? 'accept' : 'reject'} kyc verification?`;

                const callback = async () =>
                {
                    this.$_showPageLoading();
                    const user_id = DB_USER.getCurrentUser().uid;

                    const data =
                    {
                        status          : is_accepted ? 'approved' : 'rejected',
                        modified_by     : user_id,
                        modified_date   : new Date(),
                        user_id         : this.kyc_details_value.id,
                        reason          : ""
                    };

                    // await DB_KYC_VERIFICATION.update(this.kyc_details_value.id, data);
                    // await DB_USER.update(this.kyc_details_value.id, {kyc_status: data.status});

                    let status  = is_accepted ? 'approved' : 'rejected';
                    
                    await fbCall(FN_KYC, data);

                    this.$_hidePageLoading();

                    this.$_notify
                    ({
                        message : `Successfully ${data.status} KYC`,
                        mode    : 'positive'
                    });
                    this.$refs.kModalRef.hideModal()
                };

                if (is_accepted == undefined)
                {
                    this.showReasonModal();
                    return;
                }
                this.$_showConfirmDialog(message, callback);
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
        ],
        img_fields:
        [
            {key: 'front_id_url' , label: 'ID (Front)'},
            {key: 'back_id_url'  , label: 'ID (Back)'},
            {key: 'selfie_url'   , label: 'ID (Selfie)'}
        ]
    }
</script>

<style scoped>

</style>
