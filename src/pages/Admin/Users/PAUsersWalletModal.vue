<template>
    <k-modal ref="kModalRef" card_width="800px" card_section_height="50vh">
        <div slot="modal-header">
            <div class="text-h6">Wallet</div>
        </div>

        <div slot="modal-content">
            <div class="row">
                <div class="col-12 q-ma-xs">
                    Name: {{user_details.name}}
                </div>

                <!--WALLET-->
                <k-card class="col q-ma-xs"
                        v-for="wallet in walletDetails" :key="wallet.key">
                    <span slot="section">
                        <div class="q-mb-md text-center">
                            {{wallet.key}}
                        </div>

                        <div class="col">
                            <k-field label="Wallet Address">
                                <q-input dense outlined readonly
                                         :value="''"
                                         type="text"/>
                            </k-field>

                            <k-field label="Balance">
                                <q-input dense outlined readonly
                                         :value="wallet.wallet"
                                         type="text"/>
                            </k-field>
                        </div>
                    </span>
                </k-card>
            </div>
        </div>
        <div slot="modal-footer">
            <q-btn flat label="Send BTC" @click="" />
            <q-btn flat color="grey" label="Close" @click="hideWalletModal"/>
        </div>
    </k-modal>
</template>

<script>
    import KCard  from '../../../components/Admin/KCard'
    import KField from '../../../components/Admin/KField'
    import KModal from '../../../components/Admin/KModal'

    import DB_USER_WALLET from '../../../models/DB_USER_WALLET'

    export default {
        name: "PAUsersWalletModal",
        components: {KModal, KField, KCard},
        data: () =>
        ({
            user_details:
            {
                name: ''
            },
            user_wallet: []
        }),
        computed:
        {
            walletDetails()
            {
                return this.user_wallet
            }
        },
        methods:
        {
            async showUsersWalletModal(user_details)
            {
                this.$refs.kModalRef.showModal();
                this.$refs.kModalRef.showLoading();

                // Assign user details
                this.user_details = Object.assign({}, user_details);

                // Get user wallet
                this.user_wallet = await DB_USER_WALLET.getMany(user_details.id);

                this.$refs.kModalRef.hideLoading();
            },
            hideWalletModal()
            {
                this.user_wallet = [];
                this.$refs.kModalRef.hideModal()
            }
        }
    }
</script>

<style scoped>

</style>
