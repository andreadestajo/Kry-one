<template>
    <div>
        <k-modal ref="kModalRef" card_width="500px" card_section_height="60vh">
            <div slot="modal-header" >
                <div class="text-h6">Send BTC</div>
            </div>

            <div slot="modal-content">
               <div>
                   <!-- SOURCE WALLET -->
                   <k-field label="Source Wallet">
                       <q-select v-model="form.source_wallet"
                                 :options="['BTC', 'UNIQ', 'ETH']"
                                 options-selected-class="text-deep-grey" dense outlined stack-label>
                           <template v-slot:option="scope">
                               <q-item v-bind="scope.itemProps"
                                       v-on="scope.itemEvents">
                                   <q-item-section>{{scope.opt}}</q-item-section>

                                   <q-item-section side>
                                       <q-item-label class="text-primary">0.00000003 BTC</q-item-label>
                                       <q-item-label>PHP 1,500.00</q-item-label>
                                   </q-item-section>
                               </q-item>
                           </template>
                       </q-select>
                   </k-field>

                   <!-- AMOUNT -->
                   <k-field label="Amount">
                       <q-input v-model="form.amount"
                                placeholder="0.0000000"
                                dense outlined stack-label></q-input>
                   </k-field>

                   <!-- TO -->
                   <k-field label="To">
                       <q-input v-model="form.receiver"
                                dense outlined stack-label readonly></q-input>
                   </k-field>
               </div>
            </div>

            <div slot="modal-footer">
                <q-btn flat label="Continue" @click="" />
                <q-btn flat color="grey" label="Back" @click="$refs.kModalRef.hideModal()"/>
            </div>
        </k-modal>

        <!--ALERTS-->
        <k-alert ref="confirmation"></k-alert>
    </div>
</template>

<script>
    import KModal  from '../../../components/Admin/KModal'
    import KAlert  from '../../../components/Shared/KAlertDialog'
    import KField  from '../../../components/Member/KField'

    export default {
        name: "PAUsersSendBtcModal",
        components: {KModal, KAlert, KField },
        data: () =>
        ({
            form:
            {
                source_wallet : '',
                amount        : '',
                receiver      : ''
            }
        }),
        methods:
        {
            showSendBtcModal(user_details)
            {
                // Initialize date
                this.form.receiver = user_details.full_name;

                this.$refs.kModalRef.showModal();

            }
        }
    }
</script>

<style scoped>

</style>
