import Firebase from './firebase';
import Admin from './admin';
import {SessionM} from '../client/src/shared/models';
import DatabaseServer from './database'
import util from 'util';




export default class Auth {
	// NOTE data.email and data.password are required, if not provided we'll use signInAnonymously
	static signUpUser(data) {
		return new Promise((resolve, reject) => {
			if(!data && !data.email && !data.password)
				reject("No data specified");

			Admin.auth().createUser(data).then((user) => {

				let token = SessionM.createSessionToken();

				DatabaseServer.setSessionToken(token, user.uid);

				resolve({token, user});
			}).catch((err)  => {

				reject(err);
			})
		});
	}


	static signUpAnon() {
		return new Promise((resolve, reject) => {
			Admin.auth().createUser({disabled: false}).then((user) => {
				let token = SessionM.createSessionToken();
				DatabaseServer.setSessionToken(token, user.uid);
				resolve({token, user});
			}).catch((err)  => {
				reject(err);
			})
		});
	}

	// NOTE only used by users which have signed up with email and password
	static signInUser(data) {
		return new Promise((resolve, reject) => {
			if(data && data.email && data.password)
				return Firebase.auth().signInWithEmailAndPassword(data.email,data.password).then((user) => {

						let token = SessionM.createSessionToken();
						DatabaseServer.setSessionToken(token, user.uid);
						resolve({isSuccessful: true, token, user});
				}).catch((err) => reject(err));
			else {
				reject("No data specified");
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
							reject("No user found")
					}).catch((err) => reject(err));
				}).catch((err) => reject(err));
			else {

				reject("No token to look up for verify Auth")
			}
		});
	}
}
