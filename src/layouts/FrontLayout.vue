<template>
	<q-layout view="lHh Lpr lFf">
		<router-view />
	</q-layout>
</template>

<script>
import styles from './FrontLayout.scss';

export default
{
	name: 'FrontLayout',
	data:() =>(
	{
		leftDrawerOpen: false
	}),
}
</script>