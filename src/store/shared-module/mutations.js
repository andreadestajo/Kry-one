export const MUTATION_SET_CONFIRM_DIALOG   = 'shared/setConfirmDialog';
export const MUTATION_CLEAR_CONFIRM_DIALOG = 'shared/clearConfirmDialog';

export default {
    [MUTATION_SET_CONFIRM_DIALOG]: (state, payload) => {
        state.confirm_dialog = Object.assign({}, payload);
    },
    [MUTATION_CLEAR_CONFIRM_DIALOG]: (state) => {
        state.confirm_dialog = null
    }
}

