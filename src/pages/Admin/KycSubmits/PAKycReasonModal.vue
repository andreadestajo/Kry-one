<template>
    <k-modal ref="KReasonModal" card_width="700px" card_section_height="30vh">
        <div slot="modal-header">
            <div class="text-h6">Reason for rejected KYC</div>
        </div>

        <div slot="modal-content">
            <div class="row">
                <div class="col-xs-12 col-sm-12 q-pa-sm" >
                    <k-field label="Reason">
                        <q-select 
                                  :error="$v.reason.$error"
                                  :error-message="'Reason is required'"
                                  @blur="$v.reason.$touch()"
                                  class="full-width input"
                                  placeholder="Select your reason."
                                  v-model="reason"
                                  :options="reason_options"
                                  option-label="reason"
                                  outlined
                                  dense>
                        </q-select>
                        <textarea v-if="isInputTextAreaVisible"
                                :error="$v.other_reason.$error"
                                :error-message="'Reason is required'"
                                @blur="$v.other_reason.$touch()"
                                class="has-error" 
                                v-model="other_reason"></textarea>

                    </k-field>
                </div>
            </div>
        </div>

        <div slot="modal-footer">
            <span>
                <q-btn @click="submitKycRejectStatus" flat label="Submit" />
                <q-btn color="red" flat label="Cancel" @click="$refs.KReasonModal.hideModal()" />
            </span>

            <!-- <q-btn color="grey" flat label="Close" @click="$refs.kModalRef.hideModal()"/> -->
        </div>
    </k-modal>
</template>

<script>
import KModal       from "../../../components/Admin/KModal";
import KField       from "../../../components/Admin/KField";

import DB_USER      from "../../../models/DB_USER";

import { FN_KYC }   from "../../../references/refs_functions";
import {required}   from "vuelidate/src/validators";
import { fbCall }   from '../../../utilities/Callables';

export default {
    name: "PAKycReasonModal",
    components: {KModal, KField},
    data: () => 
    ({
        reason              : "",
        reason_options      : [
            "We do not accept unclear, blur photos, or photos which are retouched by a photo editor on purpose. Please retake your photo and submit again.",

            "We set limit on submitting KYC attempts for each KryptoOne account.  We will ban you from doing the KYC if the followings happen: You have submitted the same WRONG pictures more than 3 times.You have failed more than 5 times with your KYC application.",

            "Please do not hide/cover any information on your document when submitting the KYC.  Kindly remove any stickers/tapes/duck tapes etc… on your document before taking pictures.Please do not use local languages or non-English languages to fill our KYC forms. The KYC checking process will get FASTER & EASIER if you follow this rule.",
            
            "The information you have entered does not match the details on the documents you have submitted. Please check it carefully before submitting again.",
            
            "The ID you have submitted has already expired. Please submit a new one that has not yet expired.",

            "Others (Please specify)"
        ],
        other_reason        : "",
        kyc_details_value   : {}
    }),
    mounted() 
    {
        
    },

    methods: 
    {
        showKycReasonModal()
        {
            this.$refs.KReasonModal.showModal();
        },
        setKycDetails(kyc)
        {
            this.kyc_details_value = {...kyc};
        },
        submitKycRejectStatus()
        {
            const message  = `Are you sure you want to reject kyc`;

            const callback = async () => {
                this.$emit('kycDetailsModalCloseEmit');
                this.$_showPageLoading();

                let reason      = this.reason == 'Others (Please specify)' ? this.other_reason : this.reason;

                const user_id   = this.kyc_details_value.user_id;
                const data      = {
                    status          : 'rejected',
                    modified_by     : user_id,
                    modified_date   : new Date(),
                    user_id         : user_id,
                    reason          : reason
                }

                await fbCall(FN_KYC, data);
                
                this.$_hidePageLoading();
                
                this.$_notify
                ({
                    message : `Successfully rejected KYC`,
                    mode    : 'positive'
                });
            }

            this.$_showConfirmDialog(message, callback);
            this.$refs.KReasonModal.hideModal()
        }
    },

    computed: {
        isInputTextAreaVisible ()
        {
            return this.reason === 'Others (Please specify)' ? true : false;
        }
    },

    validations: 
    {
        reason          : {required},
        other_reason    : {required},
    }

}
</script>
<style scoped>
textarea {
        width: 100%;
        min-height: 68px;
        margin-bottom: 0px;
        font-size: 1.1em;
}
</style>