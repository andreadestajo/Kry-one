<template>
	<div>
		<q-btn @click="callLogin()">Sample Login Call</q-btn>
		<q-btn @click="callRegister()">Sample Register Call</q-btn>
	</div>
</template>

<script>
import MCallables from '../../mixins/MCallables';

import {Call, login, registration}     from "../../utilities/Callables";

export default
{
	name: "PDDeveloper",
	mixins: [ MCallables ],
	methods:
	{
		async callLogin()
		{
			let res = await Call(login);
			console.log(res.data);
		},
		async callRegister()
		{
			let res = await Call(registration);
			console.log(res.data);
		}
	}
}
</script>

<style scoped>

</style>
