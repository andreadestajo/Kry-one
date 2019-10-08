import { FUNCTIONS } from "../boot/firebase";
import { DB } from "../boot/firebase";

export const fbCall = async (method, data = null) =>
{
	let call_method = FUNCTIONS.httpsCallable(method);

	return await call_method(data).catch((e) =>
	{
		console.log(e.message);
	});
};

export const fbAdd = async(path, data) =>
{
	let res = await DB.collection(path).add(data);
	return res.id;
}

export const fbBind = async (variable, dbpath) =>
{

}

export const fbGet = async (path, id) =>
{

}