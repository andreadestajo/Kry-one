<template>
    <div class="receive">
        <k-header detail="Make sure you copy the right address">Wallet Receive</k-header>
        <div class="q-pt-md">
            <div class="q-gutter-y-md">
                <k-card>
                    <div class="receive__container">
                        <q-input v-model="address" readonly filled />
                        <q-separator style="margin: 1rem 0;" />
                        <div style="text-align: center;">
                            <q-img style="max-width: 250px;" :src="`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${ address }`" spinner-color="white" />
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
    filters: { },
    data:() =>(
    {
        address: null
    }),
    created() 
    {
        this.address = this.$route.params.address;
    },
    mounted() { },
    methods: { },
    computed: { }
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
</style>