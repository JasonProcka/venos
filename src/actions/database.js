



// database node keys
var KEY_HUB = "hub";
var KEY_USER = "user";
var NODE_SEP = "/";


var KEY_DESTRUCTION_TIME_IN_HOURS = "destructionTimeInHours";
var KEY_DESTRUCTION_DATE = "destructionTime";
var KEY_NAME = "name";
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

var exports = module.exports = {};
var schedule = require('node-schedule');


exports.ACCESS_EVERYONE = KEY_ACCESS_EVERYONE;
exports.ACCESS_ACCOUNT = KEY_ACCESS_ACCOUNT;
exports.ACCESS_MEMBERS = KEY_ACCESS_MEMBERS;


const config = {
   apiKey: "AIzaSyCgj1rbQDMkDE80I7lYiDdeEvAHiQNDJGU",
   authDomain: "project-mango-5d7d3.firebaseapp.com",
   databaseURL: "https://project-mango-5d7d3.firebaseio.com",
   storageBucket: "project-mango-5d7d3.appspot.com",
   messagingSenderId: "663419739417"
 };


var database = null;
exports.setDatabase = function (firebase){
    database = firebase.database();
}





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
            exports.deleteHubById(hubId).then(function () {
                console.log("worked");
            });
        });
    }else{
        exports.deleteHubById(hubId).then(function () {
            console.log("worked");
        });
    }
};


var getDestructDate = function (date, hours) {
    var inMilliseconds = date.getTime();
    inMilliseconds = inMilliseconds + (hours * 1000 /* * 60 * 60 */);
    return new Date(inMilliseconds);
};






// Creates Hub, returns id of hub
exports.createHub = function (name, url, ownerUid, isPublic, destructionTimeInHours) {
    return new Promise(
        function(resolve, reject){
            var creationTime = new Date();
    
            var object = {
                [KEY_NAME]: name,   // Name of hub
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
            database.ref(KEY_USER + NODE_SEP + KEY_HUB_OWNER + NODE_SEP + KEY_HUB + NODE_SEP + reference.key).set(true);
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
            exports.getHubById(hubId).then(function (hub) {
                exports.deleteHubByIdAndUid(hubId, hub.ownerUid).then(function () {
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
            exports.getMyOwnedHubIds(ownerUid).then(function (hubIds) {
                
                var promises = [];
                
                hubIds.forEach(function (value) {
                    promises.push(exports.getHubById(value));
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
var addFileToHub = function (id) {
    
    
    
};
var removeFileFromHub = function () {};
