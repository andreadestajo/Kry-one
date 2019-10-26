export const MUTATION_SET_CURRENCY  = 'currency/setCurrency';

export default
{
    [MUTATION_SET_CURRENCY]: (state, payload) =>
    {
        if(payload && payload.length)
        {
            const currency = {};

            // Get object keys
            payload.forEach(c => {
                currency[c.id] = c
            });

            state.currency = currency;
        }
    }
}
