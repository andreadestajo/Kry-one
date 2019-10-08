<template>
	<div>
		<q-btn @click="callLogin()">Sample Login Call</q-btn>
		<q-btn @click="callRegister()">Sample Register Call</q-btn>
		<q-btn @click="callAddData()">Add Data on DB</q-btn>
		<q-btn @click="callGetData()">Get Single Data from DB</q-btn>
		<q-btn @click="callGetData()">Get Collection Data from DB</q-btn>
		<q-btn @click="callGetData()">Bind Data from DB</q-btn>
		<q-btn @click="callUpdateData()">Update Data on DB</q-btn>
	</div>
</template>

<script>

import { fbCall, fbAdd }     from "../../utilities/FB";

export default
{
	name: "PDDeveloper",
	data: '',
	methods:
	{
		async callLogin()
		{
			let res = await fbCall('login');
			console.log(res.data);
		},
		async callRegister()
		{
			let res = await fbCall('registration');
			console.log(res.data);
		},
		async callAddData()
		{
			let employee = 	{ 	
								id: Math.floor(Math.random() * 1000),
								name: 'Jolina Coronel',
								age: 22,
								birthday: new Date()
							};
			
			let id = await fbAdd('employees', employee);

			console.log("successfully added", employee);
		},
		async callGetData()
		{
		},
		async callUpdateData()
		{
		},
	}
}
</script>

<style scoped>

</style>
