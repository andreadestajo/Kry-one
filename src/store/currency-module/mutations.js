export const MUTATION_SET_CURRENCY  = 'currency/setCurrency';

export default
{
    [MUTATION_SET_CURRENCY]: (state, payload) =>
    {
        state.currency = payload ? payload : []
    }
}
