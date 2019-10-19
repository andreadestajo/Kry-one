<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
    import DB_USER from './models/DB_USER'
    import {AUTH}  from './boot/firebase'

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
                        await this.$bind('currentUser', DB_USER.doc(user.uid));

                        // Manually change emailVerified status, pwede trigger or something else
                        if(user.emailVerified && !this.currentUser.emailVerified)
                        {
                            DB_USER.update(user.uid, {emailVerified: true})
                        }

                        this.$_hidePageLoading();
                    } else {
                        this.$_hidePageLoading();
                    }
                });
            }
        },
        mounted()
        {
            this.setAuthStateObserver();
        },
        watch: {
            currentUser(data)
            {
                // Just put the data you need or you could also store everything
                const userData = Object.assign({}, data);
                this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, userData);
            }
        }
    }
</script>
