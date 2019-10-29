
// Default loading configuration
const defaultOptions = {
    message : '...'
};

export default {
    methods: {
        $_notify(options)
        {
            const opts = Object.assign(defaultOptions, options);

            this.$q.notify({
                message: opts.message
            })
        }
    }
}
