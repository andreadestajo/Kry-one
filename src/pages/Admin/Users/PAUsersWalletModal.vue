<template>
    <div>
        <k-modal ref="kModalRef"
                 card_width="900px"
                 card_section_height="60vh"
                 title="Wallet"
                 @close="hideWalletModal">
            <div slot="modal-content">
                <div class="row">
                    <div class="col-12 q-ma-xs">
                        Name: {{user_details.full_name}}
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

                            <k-field :label="`${wallet.key} Balance`">
                                <q-input dense outlined readonly
                                         :value="wallet.wallet"
                                         type="text"/>
                            </k-field>

                            <div>
                                {{ $_convertRate(wallet.wallet, wallet.key, 'PHP', { decimal: 2 }) }} PHP
                                <q-icon name="fa fa-exchange-alt"></q-icon>
                                {{ $_convertRate(wallet.wallet, wallet.key, 'USD', { decimal: 2 }) }} USD
                            </div>

                            <div class="q-pt-lg">
                                <q-btn unelevated label="VIEW LOGS"
                                       color="primary"
                                       class="full-width"
                                       @click="viewLogs(wallet.key)"/>
                            </div>
                        </div>
                    </span>
                    </k-card>
                </div>
            </div>

            <div slot="modal-footer">
                <q-btn flat label="Send BTC" @click="showSendBtcModal" />
            </div>
        </k-modal>

        <!--SEND BTC MODAL-->
        <users-send-btc-modal ref="usersSendBtcModalRef"/>
    </div>
</template>

<script>
    import KCard              from '../../../components/Admin/KCard'
    import KField             from '../../../components/Admin/KField'
    import KModal             from '../../../components/Admin/KModal'
    import UsersSendBtcModal  from './PAUsersSendBtcModal'

    import DB_USER_WALLET from '../../../models/DB_USER_WALLET'
    import DB_USER        from '../../../models/DB_USER'

    export default {
        name: "PAUsersWalletModal",
        components: {KModal, KField, KCard, UsersSendBtcModal},
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
            async showUsersWalletModal(user_id)
            {
                this.$refs.kModalRef.showModal();
                this.$refs.kModalRef.showLoading();

                // Get user details
                this.user_details = await DB_USER.get(user_id);

                // Get user wallet
                this.user_wallet = await DB_USER_WALLET.getMany(user_id);

                this.$refs.kModalRef.hideLoading();
            },
            hideWalletModal()
            {
                this.$refs.kModalRef.hideModal();
                this.$router.push({name: 'admin_users'});
            },
            showSendBtcModal()
            {
                this.$refs.usersSendBtcModalRef.showSendBtcModal(this.user_details);
            },
            viewLogs(currency)
            {
                const routeData = this.$router.resolve
                ({
                    name: 'admin_logs',
                    query:
                    {
                        email   : this.user_details.email,
                        currency: currency
                    }
                });
                window.open(routeData.href, '_blank');
            }
        },
        mounted()
        {
            const user_id = this.$route.params.user_id;
            this.showUsersWalletModal(user_id);
        }
    }
</script>

<style scoped>

</style>
