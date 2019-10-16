<template>
	<q-layout view="lHh Lpr lFf">
		<div class="sample">
			HELLO WORLD
		</div>
		<router-view />
	</q-layout>
</template>

<script>
  export default {
    name: 'FrontLayout',

    data () {
      return {
        leftDrawerOpen: false
      }
    }
  }
</script>

<style>

</style>