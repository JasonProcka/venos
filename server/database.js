// database node keys
var KEY_HUB = "hub";
var KEY_USER = "user";
var NODE_SEP = "/";

var KEY_DESTRUCTION_TIME_IN_HOURS = "destructionTimeInHours";
var KEY_DESTRUCTION_DATE = "destructionTime";
var KEY_NAME = "name";
var KEY_DESCRIPTION = "description";
var KEY_OWNER_UID = "ownerUid";
var KEY_PUBLIC = "public";
var KEY_URL = "url";
var KEY_CREATION_TIME = "creationTime";
var KEY_HUB_OWNER = "hubOwner";
var KEY_HUB_MEMBER = "hubMember";
var KEY_EMAIL = "email";
var KEY_FILES = "files";
var KEY_ACCESS_EVERYONE = "everyone"; // hub access for everyone
var KEY_ACCESS_ACCOUNT = "account" // hub access for people with gively account
var KEY_ACCESS_MEMBERS = "members" // hub access only for one's self and all whitelisted admins and member

var Firebase = require('firebase');
const config = {
    apiKey: "AIzaSyCgj1rbQDMkDE80I7lYiDdeEvAHiQNDJGU",
    authDomain: "project-mango-5d7d3.firebaseapp.com",
    databaseURL: "https://project-mango-5d7d3.firebaseio.com",
    storageBucket: "project-mango-5d7d3.appspot.com",
    messagingSenderId: "663419739417"
};
var util = require('util');

Firebase.initializeApp(config);

var database = Firebase.database();

var addFileToHub = function(userid, hubid, file) {
    console.log('kp');
    // bucket.upload("files/" + hubid + "/" + file.preview, function(err, file) {
    //   if (!err) {
    //     // "zebra.jpg" is now in your bucket.
    //   }
    // });

    var fileRef = Firebase.database().ref(KEY_FILES).push();
    var promise1 = fileRef.set({name: file.name, owner: userid, [KEY_HUB]: {[hubid]: true}});
    var promise2 = Firebase.database().ref(KEY_USER + NODE_SEP + userid + NODE_SEP + KEY_FILES + NODE_SEP + fileRef.key).set(true);
    var promise3 = Firebase.database().ref(KEY_HUB + NODE_SEP + hubid + NODE_SEP + KEY_FILES + NODE_SEP + fileRef.key).set(true);

    // var promise2 = Firebase.database().ref(KEY_HUB + NODE_SEP + hubid + NODE_SEP + KEY_FILES).push().set(file);
    //
    return Promise.all([promise1, promise2, promise3]);
};

var getFilesOfHub = function(hubid) {
    return new Promise(function(resolve, reject) {
        var ref = Firebase.database().ref(KEY_HUB + NODE_SEP + hubid);
        ref.once('value').then(function(snapshot) {

            console.log('first snap: ' + snapshot.val());

            var promises = [];
            console.log("thehubid: " + hubid);
            console.log(util.inspect(snapshot.val(), { showHidden: true, depth: null }));


            var files = snapshot.val().files;
            for(var fileid in files){


                promises.push(new Promise(function(resolve, reject){


                    Firebase.database().ref(KEY_FILES + NODE_SEP + fileid).once('value').then(function(snapshot) {
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
