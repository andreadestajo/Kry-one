<template>
	<div>
		<q-btn @click="callLogin()">Sample Login Call</q-btn>
		<q-btn @click="callRegister()">Sample Register Call</q-btn>
	</div>
</template>

<script>
import MCallables from '../../mixins/MCallables';

export default
{
	name: "PDDeveloper",
	mixins: [ MCallables ],
	methods:
	{
		async callLogin()
		{
			let res = await this.$_call('login');
			console.log(res.data);
		},
		async callRegister()
		{
			let res = await this.$_call('registration');
			console.log(res.data);
		}
	}
}
</script>

<style scoped>

</style>
