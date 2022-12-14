<template>
    <k-modal ref="kModalRef"
             card_width="500px"
             card_section_height="60vh"
             title="Issue Wallet"
             @close="hideUsersIssueWalletModal">

        <div slot="modal-content">
            <span slot="section">
                <div class="col">
                    <!-- AMOUNT -->
                    <k-field label="Amount">
                        <q-input dense outlined
                                 v-model="issue_wallet_form.amount"
                                 type="text"
                                 :error="$v.issue_wallet_form.amount.$error"
                                 :error-message="amountError"
                                 @blur="$v.issue_wallet_form.amount.$touch()"/>
                    </k-field>

                    <!-- CURRENCY -->
                    <k-field label="Currency">
                        <q-select outlined
                                  dense
                                  v-model="issue_wallet_form.currency"
                                  :options="$options.currency_options"
                                  option-value="value"
                                  option-label="label"
                                  :error="$v.issue_wallet_form.currency.$error"
                                  :error-message="'Currency is required.'"
                                  @blur="$v.issue_wallet_form.currency.$touch()"
                                  options-selected-class="text-deep-grey" stack-label>
                           <template v-slot:option="scope">
                               <q-item v-bind="scope.itemProps"
                                       v-on="scope.itemEvents">
                                   <q-item-section>{{scope.opt.label}}</q-item-section>

                                   <q-item-section side>
                                       <q-item-label class="text-primary"></q-item-label>
                                       <q-item-label></q-item-label>
                                   </q-item-section>
                               </q-item>
                           </template>
                        </q-select>
                    </k-field>

                    <!-- TO -->
                    <k-field label="To">
                        <q-input v-model="issue_wallet_form.issue_to"
                                dense outlined stack-label readonly></q-input>
                    </k-field>
                </div>
            </span>
        </div>

        <div slot="modal-footer">
            <q-btn flat label="CONTINUE" @click="issueWallet" />
        </div>
    </k-modal>
</template>

<script>
    import KModal from '../../../components/Admin/KModal'
    import KCard  from '../../../components/Admin/KCard'
    import KField from '../../../components/Admin/KField'

    import currency_refs       from '../../../references/refs_currencies'
    import {fbCall}            from "../../../utilities/Callables";
    import {FN_ISSUE_WALLET}   from "../../../references/refs_functions";
    import {required, decimal} from "vuelidate/src/validators";

    export default
    {
        name        : "PAUsersIssueWalletModal",
        components  : {KModal, KCard, KField},
        data: () =>
        ({
            issue_wallet_form:
            {
                amount   : 0,
                currency : '',
                issue_to : ''
            },
            user_details: {}
        }),
        computed:
        {
            amountError()
            {
                return !this.$v.issue_wallet_form.amount.required
                    ? 'Amount is required.'
                        : !this.$v.issue_wallet_form.amount.decimal
                    ? 'Invalid amount.'
                        : ''
            },
        },
        methods:
        {
            showUsersIssueWalletModal(user_details)
            {
                // Initialize issue wallet form
                this.issue_wallet_form =
                {
                    amount   : 0,
                    currency : '',
                    issue_to : user_details.name
                };

                this.user_details = Object.assign({}, user_details);
                this.$refs.kModalRef.showModal();
            },
            hideUsersIssueWalletModal()
            {
                this.$refs.kModalRef.hideModal()
            },
            issueWallet()
            {
                this.$v.issue_wallet_form.$touch();
                if(this.$v.issue_wallet_form.$error) {return 0}

                const issue_wallet          = {};
                issue_wallet.amount         = this.issue_wallet_form.amount;
                issue_wallet.issue_to       = this.user_details.id;
                issue_wallet.currency       = this.issue_wallet_form.currency.value === "uniq" ? "xau" : this.issue_wallet_form.currency.value;

                const issue_wallet_func = async () => {
                    this.$_showPageLoading();

                    try
                    {
                        let res = await fbCall(FN_ISSUE_WALLET, issue_wallet);
                        this.$q.notify({ message: res.data.message, color: 'green' });
                    }
                    catch(err)
                    {
                        this.$q.notify({ message: err.message, color: 'red' });
                    }

                    this.$_hidePageLoading();
                    this.hideUsersIssueWalletModal();
                };

                // Confirm dialog for issuing wallet
                this.$_showConfirmDialog
                (
                    `Are you sure you want to issue ${issue_wallet.amount} ${this.issue_wallet_form.currency.label} to the account of ${this.user_details.name}.` ,
                     issue_wallet_func
                );

            },
        },
        currency_options: (() => currency_refs.map(c => ({value: c.key, label: c.abb})))(),
        validations:
        {
            issue_wallet_form:
            {
                amount  : {required, decimal},
                currency: {required}
            }
        }
    }
</script>

<style scoped>

</style>
