import {HubM, HubC, UserC, UrlC} from './models'
import config from './config';
import Firebase from 'firebase';

Firebase.initializeApp(config);
var database = Firebase.database();


// ------------------- Hub Methods ---------------------------

// used after a restart of the server

class DatabaseUtil{

	static findHubByUrl(url) {
	    return new Promise(
	        (resolve, reject) => {

	            Firebase.database().ref(`${HubC.KEY}/`).orderByChild(HubC.URL).equalTo(url).limitToFirst(1).once('value').then(function(snapshot) {
	                // current snapshot contains 'hub' as key and the hub object as value but we can't access it so we need to get it somehow:
	                if(snapshot == null || snapshot.val() == null)
	                    reject("Fetched data is null, hub can't exist");

	                snapshot.forEach((childSnapshot) => {
	                    if(childSnapshot.val()){
	                        var hubObject = new HubM(
								{
		                            [HubC.KEY]: childSnapshot.key,
		                            [HubC.NAME]: childSnapshot.child(HubC.NAME).val(),
		                            [HubC.DESCRIPTION]: childSnapshot.child(HubC.DESCRIPTION).val(),
		                            [HubC.URL]: childSnapshot.child(HubC.URL).val(),
		                            [HubC.OWNER]: childSnapshot.child(HubC.OWNER).val(),
		                            [HubC.DESTRUCTION_TIME_IN_HOURS]: childSnapshot.child(HubC.DESTRUCTION_TIME_IN_HOURS).val(),
		                            [HubC.IS_PUBLIC]: childSnapshot.child(HubC.IS_PUBLIC).val()
								}
	                        );
	                        console.info("key: "  + childSnapshot.child('name').val());
	                        resolve(hubObject);
	                    } else
	                        reject("Value ob hub does not exist");

	                });
	            }).catch(() => reject("No hub data found using Firebase"));
	        }
		);
	}




	static createHub(data) {
		return new Promise(
	        function(resolve, reject){

	            var reference = database.ref(HubC.KEY).push();



	            return Promise.all(
					[
						reference.set(data, (error) => {
	                    	if(error)
	                        	reject(error);
	                    	// startHubDesctruct(reference.key, destructionDate);
	                	}),
	             		database.ref(`${UserC.KEY}/${data[HubC.OWNER]}/${UserC.OWNS}/${UserC.HUBS}/${reference.key}`).set(true),
						database.ref(`${UrlC.KEY}/${data[HubC.URL]}`).set(
							{
								[UrlC.ID]: reference.key,
								[UrlC.TYPE]: UrlC.TYPE_HUB
							}
						)
					]
				).then(() => resolve(reference.key)).catch((err) => reject(err));
	    });
	}

	static deleteHubByIdAndUid(hubId, ownerUid) {
	    var promises = [];
	    promises.push(database.ref(`${HubC.KEY}/${hubId}`).remove());
	    promises.push(database.ref(`${UserC.KEY}/${ownerUid}/${UserC.OWNS}/${UserC.HUBS}/${hubId}`).remove());
	    return Promise.all(promises);
	};

	static deleteHubById(hubId){

	    return new Promise(
	        (resolve, reject) => {
	            DatabaseUtil.getHubById(hubId).then(
					(hub) => {
	                	DatabaseUtil.deleteHubByIdAndUid(hubId, hub.ownerUid).then(
							() => resolve()
						)
	            	},	() => reject()
				);
	        }
		);

	};

	static addMemberToHubByUsername(hubId, uid, accessRights) {
		return Promise.all(
			[
				database.ref(`${HubC.KEY}/${HubC.MEMBERS}/${uid}/$`).set(true)
    			// TODO add Access Rights database.ref(`${UserC.KEY}/${uid}/${KEY_HUB_MEMBER + NODE_SEP + KEY_USER + uid`).set(true)
			]);
	}

	static getHubById(hubId){
    	return new Promise(
	        (resolve, reject) => {
	            database.ref(`${HubC.KEY}/${hubId}`).once('value').then(
					(snapshot) => {
		                if (snapshot === null || snapshot.val() === null)
		                    reject();
		                else {
		                    var o = snapshot.val();
		                    o.id = snapshot.key;
		                    resolve(o);
		                }
	            	}
				);
	        }
    	);
	}

	static getHubByUrl(url){
		return new Promise(
			(resolve, reject) => {

				database.ref(`${UrlC.KEY}/${url}`).once('value').then(
					(snapshot) => {
						if (snapshot === null || snapshot.val() === null)
		                    reject();
		                else
							DatabaseUtil.getHubById(snapshot.val()[UrlC.ID]).then((hub) => resolve(hub)).catch((err) => reject(err));
					}
				)
			}
		)
	}

 	static getMyOwnedHubIds(uid){
	    return new Promise(
	        (resolve, reject) => {
	            database.ref(`${UserC.KEY}/${uid}/${UserC.OWNS}/${UserC.HUBS}`).once('value').then(
					(snapshot) => {
		                if (snapshot === null || snapshot.val() === null)
		                    reject();
		                else
		                    resolve(Object.keys(snapshot.val()));
	            	}
				);
	        }
	    );
	}

	static updateHub(id, updates){
    	return database.ref(`${HubC.KEY}/${id}`).update(updates);
	}

	static getMyHubs(ownerUid) {
	    return new Promise(
	        function (resolve, reject) {
	            DatabaseUtil.getMyOwnedHubIds(ownerUid).then(
					(hubIds) => {
		                var promises = [];
		                hubIds.forEach(
							(value) => {
		                    	promises.push(DatabaseUtil.getHubById(value));
		                	}
						);
		                Promise.all(promises).then(
							(value) => {
		                    	resolve(value);
		                	}, () => reject());
	            	}, () => reject()
	            );
	        }
	    );
	}


}

export {Firebase};
export default DatabaseUtil;
