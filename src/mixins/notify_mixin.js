
// Default loading configuration
const defaultOptions = {
    message : '...',
    mode    : ''
};

export default {
    methods: {
        $_notify(options)
        {
            const opts = Object.assign(defaultOptions, options);

            const color = opts.hasOwnProperty('color')
                ? opts.color
                    : opts.mode === 'positive'
                ? 'green'
                    : opts.mode === 'negative'
                ? 'red' : 'primary';

            this.$q.notify({
                message : opts.message,
                color
            })
        }
    }
}
