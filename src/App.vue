<template>
  <div id="q-app">
      <ks-splash-screen v-if="is_page_loading"/>
      <router-view v-else/>
      <k-confirm-dialog />
  </div>
</template>

<script>
    import KsSplashScreen from './components/KSplashScreen'
    import KConfirmDialog from './components/Shared/KConfirmDialog'

    import DB_USER        from "./models/DB_USER";
    import DB_CURRENCY    from "./models/DB_CURRENCY"

    import {mapGetters}          from 'vuex'
    import {GETTER_USER_AUTH_ID} from "./store/user-module/getters";

    import {
        MUTATION_SET_CURRENT_USER_DATA,
        MUTATION_SET_CURRENT_AUTH_ID,
    } from "./store/user-module/mutations";

    import {MUTATION_SET_CURRENCY} from "./store/currency-module/mutations";

    export default
    {
        name: 'App',
        components: {
            KsSplashScreen,
            KConfirmDialog
        },
        data: () =>
        ({
            current_user_data : {},
            currency_data     : [],
            is_page_loading   : true
        }),
        computed:
        {
            ...mapGetters(
            {
                current_auth_id: GETTER_USER_AUTH_ID
            })
        },
        mounted()
        {
            const auth_id = localStorage.getItem('auth_id');

            if(auth_id)
            {
                this.$store.commit(MUTATION_SET_CURRENT_AUTH_ID, auth_id)
            }
        },
        watch:
        {
            async current_auth_id(authId)
            {
                if(authId)
                {
                    await this.$bind('current_user_data', DB_USER.doc(authId));
                    await this.$bind('currency_data'    , DB_CURRENCY.collection());
                }

                this.is_page_loading = false;
            },
            current_user_data(user_data)
            {
                const _userData = Object.assign({}, user_data);
                _userData.uid   = this.current_auth_id;

                this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, user_data)
            },
            currency_data(currency_data)
            {
                this.$store.commit(MUTATION_SET_CURRENCY, currency_data)
            }
        }
    }
</script>
