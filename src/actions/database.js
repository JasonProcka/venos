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

var KEY_ACCESS_EVERYONE = "everyone";   // hub access for everyone
var KEY_ACCESS_ACCOUNT = "account"      // hub access for people with gively account
var KEY_ACCESS_MEMBERS = "members"      // hub access only for one's self and all whitelisted admins and member


const config = {
   apiKey: "AIzaSyCgj1rbQDMkDE80I7lYiDdeEvAHiQNDJGU",
   authDomain: "project-mango-5d7d3.firebaseapp.com",
   databaseURL: "https://project-mango-5d7d3.firebaseio.com",
   storageBucket: "project-mango-5d7d3.appspot.com",
   messagingSenderId: "663419739417"
 };

import schedule from 'node-schedule';
import Firebase from './firebaseinit';
console.log('test');
import gcs from '@google-cloud/storage';

const storageClient = Storage({
    projectId: 'czernitzki-148120',
    keyFilename: '../../service.json'
});

// var storage = gcs.storage;
//
//
//
// // Create a new bucket.
//
// var bucket = gcs.bucket('venos-bucket');
var bucket;

var database = Firebase.database();



// ------------------- Hub Methods ---------------------------

// used after a restart of the server
var startAllHubDestructs = function () {
    var reference = database.ref(KEY_HUB).orderByChild(KEY_DESTRUCTION_TIME_IN_HOURS);
    reference.on('child_added', function (data) {
        var milliseconds = data.val()[KEY_DESTRUCTION_DATE];
        if(milliseconds){
            startHubDesctruct(data.key, new Date(milliseconds));
        }
    });
};

var isDateInPast = function (date) {
    var now = new Date();
    var offset = 5000; // 5 seconds
    if(date.getTime() - offset <= now){   // returns a date in the future if the date passed in is not in the future
        return true;
    }else{
        return false;
    }
}

var startHubDesctruct = function (hubId, date) {
    console.log("startHubDestruct for " + hubId + " on " + date);
    var isPast = isDateInPast(date);
    if(!isPast){
        var j = schedule.scheduleJob(date, function () {
            deleteHubById(hubId).then(function () {
                console.log("worked");
            });
        });
    }else{
        deleteHubById(hubId).then(function () {
            console.log("worked");
        });
    }
};


var getDestructDate = function (date, hours) {
    var inMilliseconds = date.getTime();
    inMilliseconds = inMilliseconds + (hours * 1000 /* * 60 * 60 */);
    return new Date(inMilliseconds);
};




var findHubByUrl = function(url){
    return new Promise(
        function(resolve, reject){

            Firebase.database().ref(KEY_HUB + NODE_SEP).orderByChild(KEY_URL).equalTo(url).limitToFirst(1).once('value').then(function(snapshot) {
                // current snapshot contains 'hub' as key and the hub object as value but we can't access it so we need to get it somehow:
                if(snapshot == null || snapshot.val() == null){
                    reject("Fetched data is null, hub can't exist");
                }
                console.log('mytest');
                snapshot.forEach(function(childSnapshot){
                    if(childSnapshot.val()){

                        var hubObject = createHubObject(
                            childSnapshot.child(KEY_NAME).val(),
                            childSnapshot.child(KEY_DESCRIPTION).val(),
                            childSnapshot.child(KEY_URL).val(),
                            childSnapshot.child(KEY_OWNER_UID).val(),
                            childSnapshot.child(KEY_DESTRUCTION_TIME_IN_HOURS).val(),
                            childSnapshot.child(KEY_PUBLIC).val()
                        );
                        console.log("key: "  + childSnapshot.child('name').val());
                        resolve(hubObject);
                    }else {
                        console.log('mybtest');
                        reject("Value ob hub does not exist");
                    }
                });


            }).catch(function(){
                console.log('test');
                reject("No hub data found using Firebase");

            });



        });
}

// method for getting a hub object that should be used by all hub returning methods
var createHubObject = function(name, description, url, ownerUid, destructionTimeInHours, isPublic){
    return {
        [KEY_NAME]: name,
        [KEY_DESCRIPTION]: description,
        [KEY_URL]: url,
        [KEY_OWNER_UID]: ownerUid,
        [KEY_DESTRUCTION_TIME_IN_HOURS]: destructionTimeInHours,
        [KEY_PUBLIC]: isPublic
    }
}

// Creates Hub, returns id of hub
var createHub = function (name, description, url, ownerUid, isPublic, destructionTimeInHours) {
    return new Promise(
        function(resolve, reject){
            var creationTime = new Date();

            var object = {
                [KEY_NAME]: name,
                [KEY_DESCRIPTION]: description,   // Name of hub
                [KEY_OWNER_UID]: ownerUid,   // Unique id of the owner of this hub
                [KEY_URL]: url, // TODO specified url of the hub, needs to encoded because firebase doesn't allow every special character
                [KEY_PUBLIC]: isPublic ? true : false,  // Is the hub public accessable
                [KEY_CREATION_TIME]: creationTime.getTime()
            };

            var reference = database.ref(KEY_HUB + NODE_SEP).push();


            if (destructionTimeInHours !== null && destructionTimeInHours !== undefined) {
                var destructionDate = getDestructDate(creationTime, destructionTimeInHours);

                object[KEY_DESTRUCTION_TIME_IN_HOURS] = destructionTimeInHours;
                object[KEY_DESTRUCTION_DATE] = destructionDate.getTime();

                reference.set(object, function (error) {
                    if(error){
                        reject(error);
                    }
                    // startHubDesctruct(reference.key, destructionDate);
                });
            } else {
                reference.set(object);
            }
            database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB_OWNER + NODE_SEP + KEY_HUB + NODE_SEP + reference.key).set(true);
            console.log(reference.key);
            return resolve(reference.key);
    });


};





// Deletes Hub, by it's id and owner id
var deleteHubByIdAndUid = function (hubId, ownerUid) {

    var promises = [];
    promises.push(database.ref(KEY_HUB + NODE_SEP + hubId).remove());
    promises.push(database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB_OWNER + NODE_SEP + hubId).remove());
    return Promise.all(promises);
};

var deleteHubById = function (hubId) {

    var deleteOwnerInHubPromise = new Promise(
        function (resolve, reject) {
            console.log("test: " + hubId);
            getHubById(hubId).then(function (hub) {
                deleteHubByIdAndUid(hubId, hub.ownerUid).then(function () {
                    resolve();
                });
            }, function () {
                reject();
            });
        }
    );
    return deleteOwnerInHubPromise;
};


var isUserMemberOfHub = function (hubId, uid){

}


var addMemberToHubByUsername = function (hubId, uid, ownerUid) {
    return database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB_MEMBER + NODE_SEP + KEY_USER + uid).set(true);
}


var addUserByEmail = function (hubId, email, ownerUid) {
    return database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB_MEMBER + NODE_SEP + KEY_EMAIL + email).set(true);
}


// Returns promise that retrieves an hub by id, variables are accessable as object literal
var getHubById = function (hubId) {
    return new Promise(
        function (resolve, reject) {
            database.ref(KEY_HUB + NODE_SEP + hubId).once('value').then(function (snapshot) {
                if (snapshot === null || snapshot.val() === null) {
                    reject();
                } else {
                    var o = snapshot.val();
                    o.id = snapshot.key;
                    resolve(o);
                }

            });
        }
    );
};

// Returns promie that returns all ids of hubs an user is assigned to
var getMyOwnedHubIds = function (ownerUid) {
    return new Promise(
        function (resolve, reject) {
            database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB_OWNER).once('value').then(function (snapshot) {
                if (snapshot === null || snapshot.val() === null) {
                    reject();
                } else {
                    resolve(Object.keys(snapshot.val()));
                }
            });
        }
    );
};

// Returns promise when everything is updated, just pass an object literal to updates
var updateHub = function (id, updates) {
    return database.ref(KEY_HUB + NODE_SEP + id).update(updates);
};

// Returns promise that returns all hubs an user is assigned to
var getMyHubs = function (ownerUid) {
    return new Promise(
        function (resolve, reject) {
            getMyOwnedHubIds(ownerUid).then(function (hubIds) {

                var promises = [];

                hubIds.forEach(function (value) {
                    promises.push(getHubById(value));
                });

                Promise.all(promises).then(function (value) {
                    resolve(value);
                }, function () {
                    reject();
                });
            }, function () {
                reject();
            });
        }
    );
};
// ------------------- File Methods ---------------------------
var addFileToHub = function (hubid,file) {
    // bucket.upload("files/" + hubid + "/" + file.preview, function(err, file) {
    //   if (!err) {
    //     // "zebra.jpg" is now in your bucket.
    //   }
    // });


};
var removeFileFromHub = function () {};



var obj = {
    createHub,
    findHubByUrl,
    addFileToHub,
    testit: function(){
        var reference = database.ref("test").push().set(true);
        console.log('created');
    }



};

export default obj;
