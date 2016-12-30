

// ---- Imports ---



// >>> Consts


import { FileC, UserC, HubC, Sep} from '../shared/models';
import config from '../shared/config';
import Firebase from 'firebase';
import util from 'util';

Firebase.initializeApp(config);
const database = Firebase.database();

const addFileToHub = (file, hubId) => {
	// var fileRef = Firebase.database().ref(KEY_FILES).push();
	// var promise1 = fileRef.set({name: file.name, owner: userid, [KEY_HUB]: {[hubid]: true}});
	// var promise2 = Firebase.database().ref(KEY_USER + NODE_SEP + userid + NODE_SEP + KEY_FILES + NODE_SEP + fileRef.key).set(true);
	// var promise3 = Firebase.database().ref(KEY_HUB + NODE_SEP + hubid + NODE_SEP + KEY_FILES + NODE_SEP + fileRef.key).set(true);
	var fileRef = Firebase.database().ref(FilesC.KEY).push();

	var promise1 = fileRef.set(file);

	var promise2 = Firebase.database().ref(`
		${UserC.KEY}/
			${file[FileC.OWNER]}/
				${UserC.FILES}/
					${fileRef.key}`

	).set(true);

	var promise3 = Firebase.database().ref(`
		${HubC.KEY}/
			${hubId}/
				${HubC.FILES}/
					${fileRef.key}`

	).set(true);


    return Promise.all([promise1, promise2, promise3]);
};

const getFilesOfHub = (hubId) => {
    return new Promise((resolve, reject) => {

        var ref = Firebase.database().ref(`
			${HubC.KEY}/${hubId}
		`);

        ref
		.once('value')
		.then((snapshot) => {
            var promises = [];
            var files = snapshot.val().files;
            for(var fileid in files){
                promises.push(new Promise(function(resolve, reject){
                    Firebase.database().ref(`${FileC.KEY}/${fileid}`).once('value').then(function(snapshot) {
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

module.exports = {
    addFileToHub: addFileToHub,
    getFilesOfHub: getFilesOfHub
}
