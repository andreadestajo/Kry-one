import { FUNCTIONS } from '../boot/firebase';

export default
{
    methods:
    {
        async $_call(method, data = null)
        {
            let call_method = FUNCTIONS.httpsCallable(method);

            return await call_method(data).catch((e) =>
            {
                console.log(e.message);
            });
        },
    }
}