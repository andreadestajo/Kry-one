<template>
  <div id="q-app">
      <ks-splash-screen v-if="isPageLoading"/>
      <router-view v-else/>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {AUTH} from './boot/firebase'
    import {GETTER_USER_AUTH_ID} from "./store/user-module/getters";
    import DB_USER from "./models/DB_USER";
    import {MUTATION_SET_CURRENT_USER_DATA} from "./store/user-module/mutations";
    import KsSplashScreen from './components/KSplashScreen'

    export default
    {
        name: 'App',
        components: {KsSplashScreen},
        data: () =>
        ({
            currentUserData : {},
            isPageLoading   : true
        }),
        computed:
        {
            ...mapGetters(
            {
                currentAuthId: GETTER_USER_AUTH_ID
            })
        },
        mounted()
        {
        },
        watch:
        {
            async currentAuthId(authId)
            {
                if(authId)
                {
                    // TODO jolina 1:04 am
                    await this.$bind('currentUserData', DB_USER.doc(authId));
                }
                this.isPageLoading = false;
            },
            currentUserData(userData)
            {
                this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, userData)
            }
        }
    }
</script>
