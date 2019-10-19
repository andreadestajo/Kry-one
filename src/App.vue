<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {AUTH} from './boot/firebase'
    import {GETTER_USER_AUTH_ID} from "./store/user-module/getters";
    import DB_USER from "./models/DB_USER";
    import {MUTATION_SET_CURRENT_USER_DATA} from "./store/user-module/mutations";

    export default
    {
        name: 'App',
        data: () =>
        ({
            currentUserData: {}
        }),
        computed:
        {
            ...mapGetters(
            {
                currentAuthId: GETTER_USER_AUTH_ID
            })
        },
        watch:
        {
            async currentAuthId(authId)
            {
                if(authId)
                {
                    await this.$bind('currentUserData', DB_USER.doc(authId));
                }
            },
            currentUserData(userData)
            {
                this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, userData)
            }
        }
    }
</script>
