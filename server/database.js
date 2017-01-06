

// ---- Imports ---




import { FileC, FileM, UserC, UrlC, HubC, SessionC, QuickShareKeyC, Sep} from '../client/src/shared/models';
import util from 'util';
import Admin from './admin';
import shortid from 'shortid';

const database = Admin.database();
import DatabaseU from '../client/src/shared/database';
const DatabaseUtil = new DatabaseU(database);


export default class DatabaseServer{

	static startAllHubDestructs() {
		let reference = database.ref(HubC.KEY).orderByChild(HubC.DESTRUCTION_TIME_IN_HOURS);
	    reference.on('child_added', (data) => {
	        var milliseconds = data.val()[HubC.DESTRUCTION_DATE];
	        if(milliseconds){
	            DatabaseServer.startHubDesctruct(data.key, new Date(milliseconds));
	        }
	    });
	}

	static isDateInPast(date){
	    let now = new Date();
	    let offset = 5000; // 5 seconds
	    if(date.getTime() - offset <= now)   // returns a date in the future if the date passed in is not in the future
	        return true;
		else
	        return false;

	}

	static startHubDesctruct(hubId, date){
	    console.info("startHubDestruct for " + hubId + " on " + date);
	    let isPast = isDateInPast(date);
	    if(!isPast)
	        schedule.scheduleJob(date, () => {
	            DatabaseServer.deleteHubById(hubId).then(() => console.info("worked"));
	        });
	    else
	        DatabaseServer.deleteHubById(hubId).then(() => console.info("worked"));

	}

	static setSessionToken(token, uid){
		return database.ref(`${SessionC.KEY}/${token}`).set(uid);
	}

	static getUserUidFromSessionToken(token, uid){
		return new Promise((resolve, reject) => {
			database.ref(`${SessionC.KEY}/${token}`)
			.once('value')
			.then((snapshot) => {
				snapshot.exists() ? resolve(snapshot.val()) : reject("Snapshot does not exist, session token can't be resolved to user uid");
			}).catch((err) => reject(err));
		})
	}



	static initUniqueFileId(){
		return database.ref(FileC.KEY).push().key;
	}



	static setFileAtSpecificId(file, fileId){
		return Promise.all(
			[
				database.ref(`${UserC.KEY}/${file[FileC.OWNER]}/${UserC.OWNS}/${UserC.FILES}/${fileId}`).set(true),
				new Promise(
					(resolve, reject) =>
						{
							let ref = database.ref(`${FileC.KEY}/${fileId}`);
							resolve(ref.set(file))
						}
				)
			]
		);
	}

	static addFileToHub(file, hubId){
		return database.ref(`${HubC.KEY}/${hubId}/${HubC.FILES}/${file[FileC.ID]}`).set({
			...file
		});
	}


	static generateNewQuickShareKeyForHub(hubid){
		return new Promise(
			(resolve, reject) => {
				let id = shortid.generate().substring(0, 4);
				let expirationDate = new Date(Date.now() + 1000 * 60 * 5);

				console.log(util.inspect({
					[QuickShareKeyC.HUB]: hubid,
					[QuickShareKeyC.EXPIRATION_DATE]: expirationDate

				}));
				// 5 minutes
				database.ref(`${QuickShareKeyC.KEY}/${id}`).set({
					[QuickShareKeyC.HUB]: hubid,
					[QuickShareKeyC.EXPIRATION_DATE]: expirationDate

				}).then(() => {
					resolve({id, expirationDate});
				}).catch((err) => reject(err))
			}
		)
	}
	static getHubFromQuickShareKey(id){
		return new Promise(
			(resolve, reject) => {
				database.ref(`${QuickShareKeyC.KEY}/${id}`)
				.once('value')
				.then((snapshot) => {
					if(snapshot && snapshot.exists()){
						database.ref(`${HubC.KEY}/${snapshot.val()[QuickShareKeyC.HUB]}/`).once('value').then(
							(snapshot) => {
								if(snapshot && snapshot.exists()){
									console.log("e: " + util.inspect(snapshot.val()))
									resolve(snapshot.val());
								}else {
									reject("Snapshot2 does not exist");
								}
							}
						)

					}else{
						reject("Snapshot1 does not exist");
					}
				})
			}
		)
	}







	static addFile(file){
		return new Promise(
			(resolve, reject) => {
				let reference = database.ref(FileC.KEY).push();
				Promise.all(
					[
						database.ref(`${UserC.KEY}/${file[FileC.OWNER]}/${UserC.OWNS}/${UserC.FILES}/${reference.key}`).set(true),
						reference.set(file)
					]
				).then(() => resolve()).catch((err) => reject(err))

			}
		)
	}


	static addFiles(files, userUid) {

		// return a Promise which resolves after every file has been added
		return Promise.all(files.map((file, index) => {
			return DatabaseServer.addFile(file);
		}));
	}


	// static addFileToHub(hubId, file, userUid, storePromise){	// storePromise is a promise that receives the reference of the files new location and is used to store the file
	//
	//
	// 	return new Promise(
	// 		(resolve, reject) => {
	// 			let reference = database.ref(FileC.KEY).push()
	// 			file = new FileM(file, userUid,[hubId]);
	// 			file[FileC.ID] = reference.key;
	// 			console.log('db: ' + util.inspect(file));
	// 			Promise.all(
	// 				[
	// 					storePromise(file),
	// 					database.ref(`${UserC.KEY}/${userUid}/${UserC.OWNS}/${UserC.FILES}/${reference.key}`).set(true),
	// 					database.ref(`${HubC.KEY}/${hubId}/${HubC.FILES}/${reference.key}`).set(true),
	// 					reference.set(file)
	//
	// 				]
	// 			).then(() => resolve()).catch((err) => reject(err))
	//
	// 		}
	// 	)
	// }

	// static addFilesToHub(files, userUid, hubId, storePromise){
	// 	console.log('-------------------------------------------------------- what');
	// 	console.log('db2: ' + util.inspect(files));
	//
	// 	return new Promise(
	// 		(resolve, reject) => {
	// 			let promises = files.map((file, index) => {
	// 				return DatabaseServer.addFileToHub(file, userUid, hubId, storePromise);
	// 			})
	// 			resolve(Promise.all(promises));
	// 		}
	// 	)
	// }


	static getFilesOfHub(hubId) {
	    return new Promise((resolve, reject) => {

	        let ref = database.ref(`${HubC.KEY}/${hubId}`);

	        ref
			.once('value')
			.then((snapshot) => {
	            let promises = [];
	            let files = snapshot.val().files;
	            for(let fileid in files){
	                promises.push(new Promise((resolve, reject) => {
	                    Firebase.database().ref(`${FileC.KEY}/${fileid}`).once('value').then( (snapshot) => {
	                        console.log("value: " + snapshot.val());
	                        resolve(snapshot.val().name);
	                    });
	                }));

	            }

	            Promise.all(promises).then(function(values){
	                resolve(values);
	            });

	            //
	            // Firebase.database().ref(KEY_FILES + NODE_SEP).orderByChild(hubid).equalTo(true).limitToFirst(1).once('value').then(function(snapshot) {
	            //     if(snapshot == null || snapshot.val() == null){
	            //         reject("Fetched data is null, hub can't exist");
	            //     }
	            //     console.log(snapshot.val());
	            //
	            //     snapshot.forEach(function(childSnapshot){
	            //         console.log("child : " + childSnapshot);
	            //
	            //     });
	            //     resolve(snapshot);
	            // }).catch(err => {
	            //     reject(err);
	            // });
	            // console.log('naja');

	        }).catch((err) => {
	            reject(err);
	        });
    	})




	}

	static getFileFromId(id){
		return new Promise(
			(resolve, reject) => {
				database.ref(`${FileC.KEY}/${id}`).once('value').then(function(snapshot) {
					if(snapshot && snapshot.exists())
						resolve(snapshot.val())
					else
						reject("Snapshot Data is not available");
				});
			}
		)
	}




	static findHubByUrl(url) {
	    return new Promise(
	        (resolve, reject) => {

	            database.ref(`${HubC.KEY}/`).orderByChild(HubC.URL).equalTo(url).limitToFirst(1).once('value').then(function(snapshot) {
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
		        (resolve, reject) => {
					console.log(util.inspect(this));
		            var reference = database.ref(HubC.KEY).push();



		            Promise.all(
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
					).then(() => resolve({...data, [HubC.ID]: reference.key})).catch((err) => reject(err));
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
		            DatabaseServer.getHubById(hubId).then(
						(hub) => {
		                	DatabaseServer.deleteHubByIdAndUid(hubId, hub.ownerUid).then(
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
								DatabaseServer.getHubById(snapshot.val()[UrlC.ID]).then((hub) => resolve(hub)).catch((err) => reject(err));
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
		            DatabaseServer.getMyOwnedHubIds(ownerUid).then(
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
