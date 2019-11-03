<template>
    <k-modal ref="kModalRef">
        <div slot="modal-header">
            <div class="text-h6">Wallet</div>
        </div>

        <div slot="modal-content">
            <div class="row">
                <div class="col-12 q-ma-xs">
                    Name: {{user_details.name}}
                </div>

                <!--UNIQ-->
                <k-card class="col q-ma-xs">
                    <span slot="section">
                        Uniq details here
                    </span>
                </k-card>

                <!--BTC-->
                <k-card class="col q-ma-xs">
                    <span slot="section">
                        BTC details here
                    </span>
                </k-card>

                <!--ETH-->
                <k-card class="col q-ma-xs">
                    <span slot="section">
                        ETH details here
                    </span>
                </k-card>
            </div>
        </div>
        <div slot="modal-footer">
            <q-btn flat label="Send BTC" @click="" />
            <q-btn flat color="grey" label="Close" @click="$refs.kModalRef.hideModal()"/>
        </div>
    </k-modal>
</template>

<script>
    import KCard  from '../../../components/Admin/KCard'
    import KModal from '../../../components/Admin/KModal'

    export default {
        name: "PAUsersWalletModal",
        components: {KModal, KCard},
        data: () =>
        ({
            user_details:
            {
                name: ''
            }
        }),
        methods:
        {
            showUsersWalletModal(user_details)
            {
                console.log(user_details);
                this.$refs.kModalRef.showModal()
            }
        }
    }
</script>

<style scoped>

</style>
