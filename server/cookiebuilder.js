
const KEY = "sessionId";
export default class CookieBuilder{


	static delete(res){
		res.cookie(KEY, "", { expires: new Date()});
	}

	static send(res, token, remember){
		if(remember)
			res.cookie(KEY, token, { expires: new Date(Date.now() + 2592000000), path: "/", httpOnly: true /*, domain: ".venos.co"*/ });
		else
			res.cookie(KEY, token, { expires: undefined, httpOnly: true, path: "/" /*, domain: ".venos.co"*/ });
	}



}
