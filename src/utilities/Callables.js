import { FUNCTIONS } from "../boot/firebase";

export const

fbCall = async (method, data = null) =>
{
	let call_method = FUNCTIONS.httpsCallable(method);

	return await call_method(data).catch((e) =>
	{
		console.log(e.message);
	});
};