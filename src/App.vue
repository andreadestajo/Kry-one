<template>
  <div id="q-app">
      <ks-splash-screen v-if="isPageLoading"/>
      <router-view v-else/>
  </div>
</template>

<script>
    import KsSplashScreen from './components/KSplashScreen'

    import DB_USER        from "./models/DB_USER";

    import {mapGetters}          from 'vuex'
    import {GETTER_USER_AUTH_ID} from "./store/user-module/getters";

    import {
        MUTATION_SET_CURRENT_USER_DATA,
        MUTATION_SET_CURRENT_AUTH_ID
    } from "./store/user-module/mutations";
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
            const auth_id = localStorage.getItem('auth_id');
            if(auth_id)
            {
                console.log('luhhh di nag work?', auth_id)
                this.$store.commit(MUTATION_SET_CURRENT_AUTH_ID, auth_id)
            }
        },
        watch:
        {
            async currentAuthId(authId)
            {
                if(authId)
                {
                    await this.$bind('currentUserData', DB_USER.doc(authId));
                }
                this.isPageLoading = false;
            },
            currentUserData(userData)
            {
                const _userData = Object.assign(userData);
                _userData.uid   = this.currentAuthId;

                this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, userData)
            }
        }
    }
</script>
