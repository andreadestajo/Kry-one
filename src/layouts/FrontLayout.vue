<template>
  <q-layout view="lHh Lpr lFf">
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
