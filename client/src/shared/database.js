import {HubM, HubC, UserC, UrlC} from './models'
import util from 'util';
// import Firebase from 'firebase';
//
// Firebase.initializeApp(config);
// var database = Firebase.database();


// ------------------- Hub Methods ---------------------------

// used after a restart of the server

class DatabaseUtil{

	constructor(_database){
		this.database = _database;
	}


	findHubByUrl(url) {
	    return new Promise(
	        (resolve, reject) => {

	            this.ref(`${HubC.KEY}/`).orderByChild(HubC.URL).equalTo(url).limitToFirst(1).once('value').then(function(snapshot) {
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




	createHub(data) {
		return new Promise(
	        (resolve, reject) => {
				console.log(util.inspect(this));
	            var reference = this.database.ref(HubC.KEY).push();



	            return Promise.all(
					[
						reference.set(data, (error) => {
	                    	if(error)
	                        	reject(error);
	                    	// startHubDesctruct(reference.key, destructionDate);
	                	}),
	             		this.database.ref(`${UserC.KEY}/${data[HubC.OWNER]}/${UserC.OWNS}/${UserC.HUBS}/${reference.key}`).set(true),
						this.database.ref(`${UrlC.KEY}/${data[HubC.URL]}`).set(
							{
								[UrlC.ID]: reference.key,
								[UrlC.TYPE]: UrlC.TYPE_HUB
							}
						)
					]
				).then(() => resolve(reference.key)).catch((err) => reject(err));
	    });
	}

	deleteHubByIdAndUid(hubId, ownerUid) {
	    var promises = [];
	    promises.push(this.database.ref(`${HubC.KEY}/${hubId}`).remove());
	    promises.push(this.database.ref(`${UserC.KEY}/${ownerUid}/${UserC.OWNS}/${UserC.HUBS}/${hubId}`).remove());
	    return Promise.all(promises);
	};

	deleteHubById(hubId){

	    return new Promise(
	        (resolve, reject) => {
	            this.getHubById(hubId).then(
					(hub) => {
	                	this.deleteHubByIdAndUid(hubId, hub.ownerUid).then(
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
				this.database.ref(`${HubC.KEY}/${HubC.MEMBERS}/${uid}/$`).set(true)
    			// TODO add Access Rights database.ref(`${UserC.KEY}/${uid}/${KEY_HUB_MEMBER + NODE_SEP + KEY_USER + uid`).set(true)
			]);
	}

	getHubById(hubId){
    	return new Promise(
	        (resolve, reject) => {
	            this.database.ref(`${HubC.KEY}/${hubId}`).once('value').then(
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

	getHubByUrl(url){
		return new Promise(
			(resolve, reject) => {

				this.database.ref(`${UrlC.KEY}/${url}`).once('value').then(
					(snapshot) => {
						if (snapshot === null || snapshot.val() === null)
		                    reject();
		                else
							this.getHubById(snapshot.val()[UrlC.ID]).then((hub) => resolve(hub)).catch((err) => reject(err));
					}
				)
			}
		)
	}

 	getMyOwnedHubIds(uid){
	    return new Promise(
	        (resolve, reject) => {
	            this.database.ref(`${UserC.KEY}/${uid}/${UserC.OWNS}/${UserC.HUBS}`).once('value').then(
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
    	return this.database.ref(`${HubC.KEY}/${id}`).update(updates);
	}

	getMyHubs(ownerUid) {
	    return new Promise(
	        function (resolve, reject) {
	            this.getMyOwnedHubIds(ownerUid).then(
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

export default DatabaseUtil;
