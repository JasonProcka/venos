

// ---- Imports ---


import {DatabaseUtil, Firebase} from '../client/src/shared/database'

import { FileC, UserC, HubC, Sep} from '../client/src/shared/models';
import util from 'util';

const database = Firebase.database();

class DatabaseServer{

	static startAllHubDestructs() {
		let reference = database.ref(HubC.KEY).orderByChild(HubC.DESTRUCTION_TIME_IN_HOURS);
	    reference.on('child_added', (data) => {
	        var milliseconds = data.val()[HubC.DESTRUCTION_DATE];
	        if(milliseconds){
	            DatabaseClient.startHubDesctruct(data.key, new Date(milliseconds));
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
	            DatabaseClient.deleteHubById(hubId).then(() => console.info("worked"));
	        });
	    else
	        DatabaseClient.deleteHubById(hubId).then(() => console.info("worked"));

	}

	static addFile(file){
		return new Promise(
			(resolve, reject) => {
				let reference = database.ref(FileC.KEY).push();
				Promise.all(
					[
						database.ref(`${UserC.KEY}/${file[FileC.OWNER]}/${UserC.OWNS}/${UserC.FILES}/${reference.key}`).set(true);
						reference.set(file);
					]
				).then(() => resolve()).catch((err) => reject(err))

			}
		)
	}


	static addFiles(files, userUid) {

		// return a Promise which resolves after every file has been added
		return Promise.all(files.map((file, index) => {
			return DatabaseUtil.addFile(file);
		}));
	}


	static addFileToHub(file, hubId, storePromise){	// storePromise is a promise that receives the reference of the files new location and is used to store the file

		return new Promise(
			(resolve, reject) => {
				let reference = database.ref(FileC.KEY).push()
				Promise.all(
					[
						storePromise(reference)
						database.ref(`${UserC.KEY}/${file[FileC.OWNER]}/${UserC.OWNS}/${UserC.FILES}/${reference.key}`).set(true);
						database.ref(`${HubC.KEY}/${hubId}/${HubC.FILES}/${reference.key}`);
						reference.set(file);

					]
				).then(() => resolve()).catch((err) => reject(err))
				}
			}
		)



	}


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
    	});
	}
}
