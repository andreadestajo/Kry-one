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

    import DB_USER         from "./models/DB_USER";
    import DB_CURRENCY     from "./models/DB_CURRENCY"
    import DB_USER_WALLET  from "./models/DB_USER_WALLET"

    import {mapGetters}          from 'vuex'
    import {GETTER_USER_AUTH_ID} from "./store/user-module/getters";

    import {
        MUTATION_SET_CURRENT_USER_DATA,
        MUTATION_SET_CURRENT_AUTH_ID,
        MUTATION_SET_CURRENT_USER_WALLET,
        MUTATION_SET_CURRENT_ADMIN_ACCESS
    } from "./store/user-module/mutations";

    import {MUTATION_SET_CURRENCY} from "./store/currency-module/mutations";
    import {arrayToObject} from "./utilities/ObjectUtils";
    import DB_ROLE from "./models/DB_ROLE";

    export default
    {
        name: 'App',
        components: {
            KsSplashScreen,
            KConfirmDialog
        },
        data: () =>
        ({
            current_user_data   : {},
            currency_data       : [],
            current_user_wallet : [],
            is_page_loading     : true
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
            } else
            {
                this.is_page_loading = false;
            }
        },
        watch:
        {
            async current_auth_id(authId)
            {
                if(authId)
                {
                    await this.$bind('current_user_wallet' , DB_USER_WALLET.collection(authId));
                    await this.$bind('current_user_data'   , DB_USER.doc(authId));


                    if(this.current_user_data && this.current_user_data.hasOwnProperty("roles")) {
                        // Get merge access based on user roles
                        const access = await DB_ROLE.getAccessByRoles(this.current_user_data.roles);
                        const merged_access = [...new Set(access.reduce((acc, val) => (acc.concat(val.access)), []))];

                        this.$store.commit(MUTATION_SET_CURRENT_ADMIN_ACCESS, merged_access)
                    }

                    await this.$bind('currency_data', DB_CURRENCY.collection());
                } else {
                    //this.$router.push({name: 'front_login'})
                }
                this.is_page_loading = false;
            },
            current_user_data(user_data)
            {
                const _userData = Object.assign({}, user_data);
                _userData.id   = this.current_auth_id;
                _userData.uid  = this.current_auth_id;

                this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, _userData)
            },
            currency_data(currency_data)
            {
                this.$store.commit(MUTATION_SET_CURRENCY, currency_data)
            },
            current_user_wallet(user_wallet)
            {
                this.$store.commit(MUTATION_SET_CURRENT_USER_WALLET, user_wallet)
            }
        }
    }
</script>
