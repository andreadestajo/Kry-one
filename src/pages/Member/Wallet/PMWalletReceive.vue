<template>
    <div class="receive">
        <k-header detail="Make sure you copy the right address">Wallet Receive</k-header>
        <div class="q-pt-md">
            <div class="q-gutter-y-md">
                <k-card>
                    <div class="receive__container">
                        <q-input :value="walletAddress" readonly filled />
                        <q-separator style="margin: 1rem 0;" />
                        <div style="text-align: center;">
                            <q-img style="max-width: 250px;" :src="`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${walletAddress}`" spinner-color="white" />
                        </div>
                    </div>
                </k-card>
            </div>
        </div>
    </div>
</template>

<script>
import KHeader from     '../../../components/Member/KHeader';
import KCard from       '../../../components/Member/KCard';

export default
{
    components: { KHeader, KCard },
    data:() =>(
    {
        address: null
    }),
    computed:
    {
        walletAddress()
        {
            const currency = this.$route.params.currency ? this.$route.params.currency.toUpperCase() : null;
            if(!currency) {return null}

            const wallet_address = this.$_current_user_wallet.hasOwnProperty(currency)
                ? this.$_current_user_wallet[currency] : null;

            if(!wallet_address)
            {
                this.$_notify({message: 'Wallet address not found.'})
            }

            return wallet_address.address
        }
    },
    methods: { }
}
</script>

<style lang="scss">
    .receive 
    {
        &__container
        {
            padding: 1rem;
        }
    }

    @media only screen and (min-width: 992px) {
        .receive {
            max-width: 600px;
            margin: auto;
        }
    }
</style>
