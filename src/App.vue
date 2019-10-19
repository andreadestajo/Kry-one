<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
    import DB_USER from './models/DB_USER'

    import {AUTH} from './boot/firebase'

    import {GETTER_CURRENT_USER_DATA}       from "./store/user-module/getters";
    import {MUTATION_SET_CURRENT_USER_DATA} from "./store/user-module/mutations";

    export default {

        name: 'App',
        data: () =>
        ({
           currentUser: {}
        }),
        methods:
        {
            setAuthStateObserver()
            {
                this.$_showPageLoading();
                AUTH.onAuthStateChanged(async (user) =>
                {
                    if (user)
                    {
                        await this.$bind('user', DB_USER.doc(user.uid));
                        this.$_hidePageLoading();
                    } else {
                        this.$_hidePageLoading();
                    }
                });
                console.log('hey ka din')
            }
        },
        mounted()
        {
            this.setAuthStateObserver();
        },
        watch: {
            currentUser(data)
            {
                console.log(data)
            }
        }
    }
</script>
