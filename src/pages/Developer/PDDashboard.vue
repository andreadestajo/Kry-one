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

        <div class="q-px-lg q-mt-lg">
		    <q-input @keydown="clear()" outlined dense class="input text-center" v-model="last_id"></q-input>
            <div v-if="user_info" style="border: 2px dashed #eee; margin: 10px; padding: 10px;">
                <div class="text-center"><b>User Information</b></div>
                <pre>{{ user_info }}</pre>
            </div>

            <div v-if="wallet_info" style="border: 2px dashed #eee; margin: 10px; padding: 10px;">
                <div class="text-center"><b>Wallet Information</b></div>
                <pre>{{ wallet_info }}</pre>
            </div>
        </div>

        <div class="q-pa-lg">
            <q-btn class="full-width q-mb-sm" @click="testUserCreate()">User Create Test</q-btn>
            <q-btn class="full-width q-mb-sm" @click="bindUserInformation()">Bind User Information</q-btn>
            <q-btn class="full-width q-mb-sm q-mt-lg" @click="triggerUserCreate()">Trigger Initialize User Information</q-btn>
        </div>


	</div>
</template>

<script>

import { fbCall } 					from "../../utilities/Callables";
import DB_EMPLOYEES 				from "../../models/DB_EMPLOYEES";
import DB_USER                      from "../../models/DB_USER";
import DB_USER_WALLET               from "../../models/DB_USER_WALLET";
import {FN_REGISTER, FN_LOGIN }     from "../../references/refs_functions";

export default
{
	name: "PDDeveloper",
	data:  () => (
	{ 
		last_id: "",
		employee_list: [],
		employee_info: null,
        registration_form_data:
        {
            full_name      : '',
            email         : '',
            password      : '',
            country       : '',
            referral_code : '',
            is_agree      : ''
        },
        user_info: null,
        wallet_info: null,
	}),
	methods:
	{
        clear()
        {
            this.wallet_info    = null;
            this.user_info      = null;
        },
        async testUserCreate()
        {
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
        },
        async bindUserInformation()
        {
            this.bindWallet();
            await this.$bind('user_info', DB_USER.doc(this.last_id));
            console.log(this.user_info);
        },
        async bindWallet()
        {
            console.log("BIND WALLET");
            await this.$bind('wallet_info', DB_USER_WALLET.collection(this.last_id));
            console.log(this.wallet_info);
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