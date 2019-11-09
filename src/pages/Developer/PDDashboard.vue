<template>
	<div>
        <!-- <div class="q-pa-lg">
            <div class="q-pa-lg text-center">INITIAL TEST</div>
            <q-btn class="full-width q-mb-sm" @click="callLogin()">Sample Login Call</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callRegister()">Sample Register Call</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callAddData()">Add Data on DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callSingleGetData()">Get Single Data from DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callManyGetData()">Get Collection Data from DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callBindData()">Bind Data from DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callBindManyData()">Bind Many Data from DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callUpdateData()">Update Data on DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callDeleteData()">Delete Data on DB</q-btn>
            <q-btn class="full-width q-mb-sm" @click="callCustom()">Call Custom</q-btn>
        </div> -->

        <div class="q-pa-lg">
            <q-btn class="q-mb-sm q-mx-sm" @click="testUserCreate()">User Create Test</q-btn>
            <q-btn class="q-mb-sm q-mx-sm" @click="bindUserInformation()">Bind User Information</q-btn>
            <q-btn class="q-mb-sm q-mx-sm" @click="issueWallet('btc')">Issue Bitcoin</q-btn>
            <q-btn class="q-mb-sm q-mx-sm" @click="issueWallet('eth')">Issue Ethereum</q-btn>
            <q-btn class="q-mb-sm q-mx-sm" @click="issueWallet('xau')">Issue Uniq</q-btn>
            <q-btn class="q-mb-sm q-mx-sm" @click="triggerUserCreate()">Trigger Initialize User Information</q-btn>
            <q-btn class="q-mb-sm q-mx-sm" @click="clear()">Clear</q-btn>
        </div>


        <div class="q-px-lg">
		    <q-input @keydown="clear()" outlined dense class="input text-center" v-model="last_id"></q-input>
        </div>

        <div class="q-pa-md">
            <div v-if="user_info" class="q-gutter-y-md">
                <q-card>
                    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                        <q-tab name="user_info" label="User" />
                        <q-tab name="wallet_info" label="Wallet" />
                        <q-tab name="wallet_logs" label="Logs" />
                        <q-tab name="upgrade_nobility" label="Upgrade Nobility" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="user_info">
                            <pre>{{ user_info }}</pre>
                        </q-tab-panel>

                        <q-tab-panel name="wallet_info">
                            <pre>{{ wallet_info }}</pre>
                        </q-tab-panel>

                        <q-tab-panel name="wallet_logs">
                            <pre>{{ btc_logs }}</pre>
                        </q-tab-panel>

                        <q-tab-panel name="upgrade_nobility">
                           
                            <div v-if="nobilities">
                                <div v-for="(nobility, key) in nobilities" :key="key"  style="border: 1px solid #eee; padding: 20px; margin: 20px; display: inline-block;">
                                    <div>
                                        <div>Title: <b>{{ nobility.title }}</b></div>
                                        <div>Rank: <b>{{ nobility.rank_order }}</b></div>
                                        <div>UNIQ Price: <b>{{ $_formatNumber(nobility.price, { decimal: 8 }) }} UNIQ</b></div>
                                        <div>BTC Price: <b>{{ $_convertRate(nobility.price, 'XAU', 'BTC', { decimal: 8 }) }} BTC</b></div>
                                        <div>ETH Price: <b>{{ $_convertRate(nobility.price, 'XAU', 'ETH', { decimal: 2 }) }} ETH</b></div>
                                        <div class="q-mt-md"><q-btn color="primary">UPGRADE TO THIS RANK</q-btn></div>
                                    </div>
                                   
                                </div>
                            </div>
                            
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>

        </div>
	</div>
</template>

<script>

import { fbCall } 					from "../../utilities/Callables";
import DB_EMPLOYEES 				from "../../models/DB_EMPLOYEES";
import DB_USER                      from "../../models/DB_USER";
import DB_NOBILITY                  from "../../models/DB_NOBILITY";
import DB_USER_WALLET               from "../../models/DB_USER_WALLET";
import DB_USER_WALLET_LOG           from "../../models/DB_USER_WALLET_LOG";
import  { FN_REGISTER, FN_LOGIN, FN_ISSUE_WALLET } from "../../references/refs_functions";

export default
{
	name: "PDDeveloper",
	data:  () => (
	{ 
        tab: "user_info",
		last_id: "7lY2iogHKxaU8w2yc8vYcOnS38B2",
		employee_list: [],
		employee_info: null,
        registration_form_data:
        {
            full_name     : '',
            email         : '',
            password      : '',
            country       : '',
            referral_code : '',
            is_agree      : ''
        },
        user_info: null,
        wallet_info: null,
        btc_logs: null,
        nobilities: [],
	}),
    async mounted()
    {
        this.$_showPageLoading();

        try
        {
            await DB_NOBILITY.bindNobilities(this);
        }
        catch(err)
        {
            this.$q.notify({ message: err.message, color: 'red' });
        }

        this.$_hidePageLoading();
    },
	methods:
	{
        clear()
        {
            this.wallet_info    = null;
            this.user_info      = null;
        },
        async issueWallet(coin)
        {
            this.$_showPageLoading();

            let issue_wallet            = {};
            issue_wallet.amount         = Math.floor(Math.random() * 100000000) / 100000000;
            issue_wallet.issue_to       = this.last_id;      
            issue_wallet.currency       = coin;

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
        },
        async bindWalletLogs()
        {
            console.log("UNDER DEVELOPMENT")
        },
        async testUserCreate()
        {
            this.$_showPageLoading();
            this.clear();

            let random_number                           = Math.floor(Math.random() * 100000); 
            this.registration_form_data.email           = `sample_${random_number}@gmail.com`;
            this.registration_form_data.full_name       = random_number;
            this.registration_form_data.password        = "PW" +  random_number;
            this.registration_form_data.country         = {name: 'Afghanistan', code: 'AF'};
            this.registration_form_data.referral_code   = "3E1jmPok";

            let res = await fbCall(FN_REGISTER, {registration_form_data: this.registration_form_data});
            this.last_id = res.data;

            this.bindUserInformation();
            this.$_hidePageLoading();
        },
        async bindUserInformation()
        {
            this.$_showPageLoading();

            try
            {
                await this.$bind('user_info', DB_USER.doc(this.last_id));
                await this.$bind('wallet_info', DB_USER_WALLET.collection(this.last_id));
                await this.$bind('btc_logs', DB_USER_WALLET_LOG.collection(this.last_id, 'BTC'));
            }
            catch(err)
            {
                this.$q.notify({ message: err.message, color: 'red' });
            }

            this.$_hidePageLoading();
        },

        async triggerUserCreate()
        {
			let res = await fbCall('testInitializeWallet', { uid: this.last_id });
			console.log(res.data);
        },
		async callLogin()
		{
			console.log(FN_LOGIN);
			let res = await fbCall(FN_LOGIN);
			console.log(res.data);
		},
		async callRegister()
		{
			console.log(FN_REGISTER);
			let res = await fbCall(FN_REGISTER);
			console.log(res.data);
		},
		async callAddData()
		{
			let employee = 	{ 	
								series: Math.floor(Math.random() * 1000),
								name: 'Jolina Coronel',
								age: 22,
								birthday: new Date()
							};

			let id 			= await DB_EMPLOYEES.add(employee);
			this.last_id 	= id;

			console.log(this.last_id);
		},
		async callSingleGetData()
		{
			let employee_information 	= await DB_EMPLOYEES.get(this.last_id);
			console.log(employee_information);
		},
		async callManyGetData()
		{
			let employee_list 			= await DB_EMPLOYEES.getMany();
			console.log(employee_list);
		},
		async callBindData()
		{
			await this.$bind('employee_info', DB_EMPLOYEES.doc(this.last_id));
			console.log(this.employee_info);
		},
		async callBindManyData()
		{
			await this.$bind('employee_list', DB_EMPLOYEES.collection());
			console.log(this.employee_list);
		},
		async callUpdateData()
		{
			let employee = 	{ 	
								name: 'Guillermo Tabligan',
								age: 27,
							};

			DB_EMPLOYEES.update(this.last_id, employee);
			return employee;
		},
		async callDeleteData()
		{
			DB_EMPLOYEES.remove(this.last_id);
		},
		async callCustom()
		{
			let employee_list 			= await DB_EMPLOYEES.getMany('birthday');
			console.log(employee_list);
		}
	}
}
</script>