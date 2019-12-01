import {Loading, QSpinnerOval} from 'quasar'

const spinner = () => QSpinnerOval;

// Default loading configuration
const defaultOptions = {
    spinner      : spinner(),
    message      : 'Please wait...',
    messageColor : 'white',
    spinnerSize  : 50, // in pixels
    spinnerColor : 'white'
};

export default {
    methods: {
        $_showPageLoading(options)
        {
            const opts = Object.assign({}, defaultOptions, options);

            Loading.show({
                spinner      : opts.spinner,
                message      : opts.message,
                messageColor : opts.messageColor,
                spinnerSize  : opts.spinnerSize,
                spinnerColor : opts.spinnerColor
            });
        },
        $_hidePageLoading()
        {
            Loading.hide();
        }
    }
}
