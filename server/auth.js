
import Admin from './admin';
import {SessionM} from '../client/src/shared/models';
import DatabaseServer from './database'
export default class Auth {
	// NOTE data.email and data.password are required, if not provided we'll use signInAnonymously
	static signUp(data){
		return new Promise((resolve, reject) => {
			let obj = {disabled: false};
			if(data && data.email && data.password)
				obj = data;

			Admin.auth().createUser(obj).then((user) => {
			
				let token = SessionM.createSessionToken();

				DatabaseServer.setSessionToken(token, user.uid);

				resolve({token, user});
			}).catch((err)  => {
				console.log('test2349');
				reject(err);
			})
		});
	}

	// NOTE only used by users which have signed up with email and password
	static signIn(data){
		return new Promise((resolve, reject) => {
			if(data && data.email && data.password)
				return Admin.auth().getUserByEmail(data.email).then((user) => {
					if(user.password === data.password){
						DatabaseServer.setSessionToken(SessionM.createSessionToken(), user.uid);
						resolve({isSuccessful: true, user});
					}else
						resolve({isSuccessful: false});
				})
			else {
				resolve({isSuccessful: false});
			}
		})

	}


	static verifyAuth(token){
		return new Promise((resolve, reject) => {
			if(token)
				DatabaseServer.getUserUidFromSessionToken(token).then((uid) => {
					Admin.auth().getUser(uid).then((user) => {
						if(user)
							resolve({isSuccessful: true, user});
						else
							resolve({isSuccessful: false})
					});
				});
			else {
				resolve({isSuccessful: false})
			}
		});
	}
}
