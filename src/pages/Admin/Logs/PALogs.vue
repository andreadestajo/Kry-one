<template>
    <q-page class="q-pa-lg">
        <k-header icon="fa fa-history" detail="Purchase for your friends">Wallet History</k-header>

        <k-table ref="kTableRef" :data="user_wallet_logs_data" :columns="$options.columns" class="text-center">
            <template slot="table_top">
                <q-input dense
                         placeholder="Search"
                         v-model="filters.search_text">
                    <template v-slot:append>
                        <q-btn flat round color="primary" icon="search" @click="filterLogs" />
                    </template>
                </q-input>

                <q-space />

                <q-select outlined
                          dense
                          v-model="filters.currency"
                          @input="filterLogs"
                          :options="$options.currency_options"
                          option-value="value"
                          option-label="label">
                </q-select>
            </template>

            <template slot="table_rows" slot-scope="logs">
                <q-td v-for="column in $options.columns.map(c => c.field)"
                      :key="column">
                    <span v-html="logs.data[column]"></span>
                </q-td>
            </template>
        </k-table>
    </q-page>
</template>

<script>
    import KHeader                 from '../../../components/Admin/KHeader'
    import KTable                  from '../../../components/Admin/KTable'

    import currency_refs           from '../../../references/refs_currencies'
    import DB_USER_WALLET_LOG      from "../../../models/DB_USER_WALLET_LOG";
    import DB_USER                 from "../../../models/DB_USER";

    export default {
        name: "PALogs",
        components: {KHeader, KTable},
        data: () =>
        ({
           user_wallet_logs     : [],
           user_wallet_logs_data: [],
           filters:
           {
               currency    : {value: 'btc', label: 'BTC'}, // Weird
               search_text : ''
           }
        }),
        methods:
        {
            async filterLogs()
            {
                if(!this.filters.search_text || !this.filters.currency) {return 0;}

                // Split search here: temporarily search for email only
                const user = await DB_USER.getUserByFilters({search_text: this.filters.search_text});

                if(!user) {return 0}

                DB_USER_WALLET_LOG.bindUserWalletLogs(this, user.id, 'user_wallet_logs', this.filters.currency.label);
            }
        },
        mounted()
        {
            const {email , currency} = this.$route.query;

            this.filters.currency = currency
                ? {label: currency, value: String(currency).toLowerCase()}
                : this.filters.currency;

            this.filters.search_text = email ? email : this.filters.search_text;

            if(email && currency)
            {
                this.filterLogs()
            }
        },
        watch:
        {
            user_wallet_logs(user_wallet_logs)
            {
                if(!user_wallet_logs.length) {return 0}

                this.$refs.kTableRef.showLoading();

                const user_wallet_logs_data = [];

                user_wallet_logs.forEach(k =>
                {
                    user_wallet_logs_data.push
                    ({
                        description   : k.description,
                        type          : k.type,
                        date_created  : this.$_formatDate(k.date_created.toDate()),
                        amount        : k.amount,
                        balance_after : k.balance_after
                    })
                });

                this.user_wallet_logs_data = user_wallet_logs_data;
                this.$refs.kTableRef.hideLoading();
            }
        },
        currency_options: (() => currency_refs.map(c => ({value: c.key, label: c.abb})))(),
        columns:
        [
            { align: 'center', label: 'Description', field: 'description' },
            { align: 'center', label: 'Type', field: 'type' },
            { align: 'center', label: 'Date', field: 'date_created' },
            { align: 'centesr', label: 'Amount', field: 'amount' },
            { align: 'center', label: 'Running Balance', field: 'balance_after' }
        ],
    }
</script>

<style scoped>

</style>

