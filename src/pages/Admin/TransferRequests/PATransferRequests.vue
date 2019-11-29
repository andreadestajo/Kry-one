<template>
    <q-page class="q-pa-lg">
        <k-header icon="people" detail="Lorem ipsum dolor sit amet">Transfer Request</k-header>
        <!--TODO Jln filters here-->

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
                <q-btn @click="processAll()" label="Process All" style="width: 100%;" unelevated color="primary" />
            </template>

            <template slot="table_rows" slot-scope="user">
                <q-td key="name">{{ user.data.name }}</q-td>
                <q-td key="currency" style="text-transform: uppercase;">{{ user.data.currency }}</q-td>
                <q-td key="amount">{{ scientificToDecimal(user.data.amount) }}</q-td>
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
import { FN_REJECT_TRANSFER, FN_PROCESS_TRANSFER } from "../../../references/refs_functions";

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
            users_data  : []
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
                await DB_TRANSFER_CRYPTO.bindAllRequests(this, { name: 'users_wew' });
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

                            await this.reload();
                            
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
        },
        watch:
        {
            users_wew(users)
            {
                if(!users.length) {return 0}

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
                        remarks        : u.remarks,
                        status         : u.status,
                        date_created   : u.date_created
                    })
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