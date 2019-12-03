<template>
    <q-page class="q-pa-lg">
        <k-header icon="people" detail="Lorem ipsum dolor sit amet">Transfer Request</k-header>
        <!--TODO Jln filters here-->
        
        <div v-if="btc_loading || eth_loading" style="text-align: center; margin-bottom: 25px;">
            <q-spinner size="50px" />
        </div>

        <div style="background-color: #fff; padding: 25px; margin-bottom: 25px; border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);" v-else>
            <div style="display: grid; grid-template-columns: auto auto auto auto auto;">
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ btc ? btc.balance_amount / 100000000 : 0 }} <span style="font-size: 1rem; font-weight: 700">BTC</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Wallet Balance</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ btc ? btc.pending_received_amount / 100000000 : 0 }} <span style="font-size: 1rem; font-weight: 700">BTC</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Pending Receive</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ btc ? btc.pending_sent_amount / 100000000 : 0 }} <span style="font-size: 1rem; font-weight: 700">BTC</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Pending Send</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ btc_transaction_fee }} <span style="font-size: 1rem; font-weight: 700">BTC</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Transaction Fee</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ btc_total_payout }} <span style="font-size: 1rem; font-weight: 700">BTC</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Total Payout</h6>
                </div>
            </div>

            <q-separator style="margin: 25px 0;" />

            <div style="display: grid; grid-template-columns: auto auto auto auto auto;">
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ eth ? eth.balance_amount / 1000000000000000000 : 0 }} <span style="font-size: 1rem; font-weight: 700">ETH</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Wallet Balance</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ eth ? eth.pending_received_amount / 1000000000000000000 : 0 }} <span style="font-size: 1rem; font-weight: 700">ETH</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Pending Receive</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ eth ? eth.pending_sent_amount / 1000000000000000000 : 0 }} <span style="font-size: 1rem; font-weight: 700">ETH</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Pending Send</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ eth_transaction_fee }} <span style="font-size: 1rem; font-weight: 700">ETH</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Transaction Fee</h6>
                </div>
                <div style="text-align: center;">
                    <h4 style="margin: 0; font-weight: 300;">{{ eth_total_payout }} <span style="font-size: 1rem; font-weight: 700">ETH</span></h4>
                    <h6 style="margin: 0; opacity: 0.5; font-weight: 400; line-height: 1rem;">Total Payout</h6>
                </div>
            </div>
        </div>

        <k-table ref="kTableRef" :data="users_data" :columns="$options.columns" class="text-center">
            <template slot="table_top">
                <!-- <q-input dense class="full-width"
                         placeholder="Search by name"
                         @keyup.enter="searchUser"
                         v-model="search_text">
                    <template v-slot:append>
                        <q-btn flat round color="primary" icon="search" @click="searchUser"/>
                    </template>
                </q-input> -->
                <q-btn @click="processAll()" label="Process Payout (First 100 Requests)" style="width: 100%;" unelevated color="primary" />
            </template>

            <template slot="table_rows" slot-scope="user">
                <q-td key="name">{{ user.data.name }}</q-td>
                <q-td key="currency" style="text-transform: uppercase;">{{ user.data.currency }}</q-td>
                <q-td key="amount">{{ scientificToDecimal(user.data.amount) }}</q-td>
                <q-td key="fee">{{ scientificToDecimal(user.data.fee) }}</q-td>
                <q-td key="remarks">{{ user.data.remarks }}</q-td>
                <q-td key="status" style="text-transform: capitalize;">{{ user.data.status }}</q-td>
                <q-td key="date_created">{{ secondsToDate(user.data.date_created.seconds) }}</q-td>
                <q-td key="action">
                    <q-btn-dropdown unelevated
                                    color="primary"
                                    label="Action">
                        <q-list>
                            <q-item clickable dense
                                    v-close-popup
                                    v-for="action in $options.actions"
                                    :key="action.key"
                                    @click="onClickAction({action, data: user.data})">
                                <q-item-section avatar  >
                                    <q-icon color="primary"
                                            size="xs"
                                            :name="action.icon"/>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{action.label}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-td>
            </template>
        </k-table>

        <router-view></router-view>
    </q-page>
</template>

<script>
import KHeader                 from '../../../components/Admin/KHeader'
import KTable                  from '../../../components/Admin/KTable'

import DB_TRANSFER_CRYPTO      from '../../../models/DB_TRANSFER_CRYPTO'
import { FN_REJECT_TRANSFER, FN_PROCESS_TRANSFER, FN_CHECK_CENTRAL_WALLET } from "../../../references/refs_functions";

import { fbCall } 			   from "../../../utilities/Callables";

export default {
        name: "PATransferRequests",
        components:
        {
            KHeader,
            KTable
        },
        data: () =>
        ({
            search_text : '',
            filters     : ['pending', 'approved', 'rejected'],
            users_wew   : [],
            users_data  : [],
            btc: null,
            eth: null,
            btc_loading: true,
            eth_loading: true,
            btc_transaction_fee: 0,
            btc_total_payout: 0,
            eth_transaction_fee: 0,
            eth_total_payout: 0
        }),
        methods:
        {
            async processAll()
            {
                if (confirm('Are you sure?'))
                {
                    this.$q.loading.show();

                    try
                    {
                        let res = await fbCall(FN_PROCESS_TRANSFER);
                        this.$q.notify({ message: res.data.message, color: res.data.status === 'success' ? 'green' : 'red' });
                    }
                    catch (e)
                    {
                        this.$q.notify({ message: err.message, color: 'red' });
                    }

                    await this.reload();
                    
                    this.$q.loading.hide();
                }
            },
            async reload()
            {
                this.$unbind('users_wew');
                this.users_wew = [];
                this.users_data = [];
                this.btc_loading = true;
                this.eth_loading = true;
                this.btc_transaction_fee = 0;
                this.btc_total_payout = 0;
                this.eth_transaction_fee = 0;
                this.eth_total_payout = 0;

                const promise1 = DB_TRANSFER_CRYPTO.bindAllRequests(this, { name: 'users_wew' });

                const promise2 = fbCall(FN_CHECK_CENTRAL_WALLET, { currency: 'btc' }).then(btc => 
                {
                    this.btc = btc.data;
                    this.btc_loading = false;
                });

                const promise3 = fbCall(FN_CHECK_CENTRAL_WALLET, { currency: 'eth' }).then(eth => 
                {
                    this.eth = eth.data;
                    this.eth_loading = false;
                });

                await Promise.all([promise1, promise2, promise3]);
            },
            scientificToDecimal(num) 
            {
                const sign = Math.sign(num);
                //if the number is in scientific notation remove it
                if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
                    const zero = '0';
                    const parts = String(num).toLowerCase().split('e'); //split into coeff and exponent
                    const e = parts.pop(); //store the exponential part
                    let l = Math.abs(e); //get the number of zeros
                    const direction = e/l; // use to determine the zeroes on the left or right
                    const coeff_array = parts[0].split('.');
                    
                    if (direction === -1) {
                        coeff_array[0] = Math.abs(coeff_array[0]);
                        num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
                    }
                    else {
                        const dec = coeff_array[1];
                        if (dec) l = l - dec.length;
                        num = coeff_array.join('') + new Array(l+1).join(zero);
                    }
                }
                
                if (sign < 0) {
                    num = -num;
                }
        
                return num;
            },
            secondsToDate(x) 
            {
                const date = new Date(x * 1000);
                return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":" + (String(date.getMinutes()).length === 2 ? date.getMinutes() : '0' + date.getMinutes()) + (date.getHours() > 12 ? " pm" : " am");
            },
            async onClickAction(item)
            {
                switch (item.action.key)
                {
                    case 'reject':
                        if (confirm('Are you sure?'))
                        {
                            this.$q.loading.show();

                            try
                            {
                                let res = await fbCall(FN_REJECT_TRANSFER, 
                                {
                                    id: item.data.id
                                });
                                this.$q.notify({ message: res.data.message, color: 'green' });
                            }
                            catch (e)
                            {
                                this.$q.notify({ message: err.message, color: 'red' });
                            }
                            
                            this.$q.loading.hide();
                        }
                        break;
                    default:
                        this.$_notify({message: 'Invalid action. Please try again'})
                }
            },
            async searchUser()
            {
                this.$refs.kTableRef.showLoading();
                const params = {};

                if(this.search_text)
                {
                    params.search_text = this.search_text.trim()
                }

                await DB_TRANSFER_CRYPTO.bindAllRequests(this, params);
            }
        },
        async mounted()
        {
            this.$refs.kTableRef.showLoading();
            await DB_TRANSFER_CRYPTO.bindAllRequests(this, { name: 'users_wew' });
            this.$refs.kTableRef.hideLoading();
            
            fbCall(FN_CHECK_CENTRAL_WALLET, { currency: 'btc' }).then(btc => 
            {
                this.btc = btc.data;
                this.btc_loading = false;
            });

            fbCall(FN_CHECK_CENTRAL_WALLET, { currency: 'eth' }).then(eth => 
            {
                this.eth = eth.data;
                this.eth_loading = false;
            });
        },
        watch:
        {
            users_wew(users)
            {
                this.btc_transaction_fee = 0;
                this.btc_total_payout = 0;
                this.eth_transaction_fee = 0;
                this.eth_total_payout = 0;

                if(!users.length) {this.users_data = []; return 0}

                this.$refs.kTableRef.showLoading();
                const users_data = [];

                users.forEach(u =>
                {
                    users_data.push
                    ({
                        id             : u.id,
                        name           : u.issue_by,
                        currency       : u.currency,
                        amount         : u.amount,
                        fee            : u.charge,
                        remarks        : u.remarks,
                        status         : u.status,
                        date_created   : u.date_created
                    });
                    
                    if (u.currency === 'btc')
                    {
                        this.btc_transaction_fee += u.charge;
                        this.btc_total_payout += u.amount;
                    }
                    else if (u.currency === 'eth')
                    {
                        this.eth_transaction_fee += u.charge;
                        this.eth_total_payout += u.amount;
                    }
                });

                this.users_data = users_data;
                this.$refs.kTableRef.hideLoading();
            }
        },
        columns:
        [
            { name: 'name'         , label: 'Name'         , field: 'name'         , align: 'center', sortable: true},
            { name: 'currency'     , label: 'Currency'     , field: 'currency'     , align: 'center', sortable: true},
            { name: 'amount'       , label: 'Amount'       , field: 'amount'       , align: 'center', sortable: true},
            { name: 'fee'          , label: 'Fee'          , field: 'fee'          , align: 'center', sortable: true},
            { name: 'remarks'      , label: 'Remarks'      , field: 'remarks'      , align: 'center', sortable: true},
            { name: 'status'       , label: 'Status'       , field: 'status'       , align: 'center', sortable: true},
            { name: 'date_created' , label: 'Date Created' , field: 'date_created' , align: 'center', sortable: true},
            { name: 'action'       , label: 'Action'       , field: 'action'       , align: 'center', sortable: true},
        ],
        actions:
        [
            { label: 'Reject'     , icon: 'fas fa-ban'   , key: 'reject'},
        ]
    }
</script>