<template>
	<div>
		<q-btn @click="callLogin()">Sample Login Call</q-btn>
		<q-btn @click="callRegister()">Sample Register Call</q-btn>
		<q-btn @click="callAddData()">Add Data on DB</q-btn>
		<q-btn @click="callSingleGetData()">Get Single Data from DB</q-btn>
		<q-btn @click="callManyGetData()">Get Collection Data from DB</q-btn>
		<q-btn @click="callBindData()">Bind Data from DB</q-btn>
		<q-btn @click="callBindManyData()">Bind Many Data from DB</q-btn>
		<q-btn @click="callUpdateData()">Update Data on DB</q-btn>
		<q-btn @click="callDeleteData()">Delete Data on DB</q-btn>
		<q-btn @click="callCustom()">Call Custom</q-btn>

		<q-input v-model="last_id"></q-input>
	</div>
</template>

<script>

import { fbCall } 					from "../../utilities/Callables";
import DB_EMPLOYEES 				from "../../models/DB_EMPLOYEES";
import { FN_LOGIN, FN_REGISTER } 	from "../../references/refs_functions";

export default
{
	name: "PDDeveloper",
	data:  () => (
	{ 
		last_id: "NO ID YET",
		employee_list: [],
		employee_info: null,
	}),
	methods:
	{
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