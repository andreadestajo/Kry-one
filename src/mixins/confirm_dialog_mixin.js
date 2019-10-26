import {mapMutations} from 'vuex'

import {
    MUTATION_SET_CONFIRM_DIALOG
} from '../store/shared-module/mutations'

export default {
    methods: {
        ...mapMutations({
            setConfirmDialogDetails: MUTATION_SET_CONFIRM_DIALOG
        }),
        $_showConfirmDialog(message, callback, options = {}) {
            const params = {message, callback};

            if(options.hasOwnProperty('title'))
            {
                params.title = options.title
            }

            this.setConfirmDialogDetails(params);
        }
    }
}
