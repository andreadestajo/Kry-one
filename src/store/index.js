import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import User     from './user-module'
import Currency from './currency-module'
import Shared   from './shared-module'


Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
        User,
        Currency,
        Shared
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  });

  return Store
}
