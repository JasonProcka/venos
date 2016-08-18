/*global require, module, Promise */
/*jslint node: true */
/*jshint es5: false */
/*jshint esnext: true */
"use strict";



// database node keys
var KEY_HUB = "hub";
var KEY_USER = "user";
var NODE_SEP = "/";


var firebase = require("./initfirebase.js");
var exports = module.exports = {};
var schedule = require('node-schedule');


var database = firebase.database();


// ------------------- Hub Methods --------------------------- 

// used after a restart of the server
exports.startAllHubDestructs = function () {};

var startHubDesctruct = function (hubId, date) {
    var j = schedule.scheduleJob(date, function () {
        exports.deleteHubById(hubId);
    });
};


var getDestructDate = function (date, hours) {
    var inMilliseconds = date.getTime();
    inMilliseconds = inMilliseconds + (hours * 1000 * 60 * 60);
    return new Date(inMilliseconds);
};


// Creates Hub, returns id of hub
exports.createHub = function (name, url, ownerUid, isPublic, destructionTimeInHours) {
    
    var creationTime = new Date(), object = {
        "name": name,   // Name of hub
        "ownerUid": ownerUid,   // Unique id of the owner of this hub
        "url": url, // TODO specified url of the hub, needs to encoded because firebase doesn't allow every special character
        "public": isPublic ? true : false,  // Is the hub public accessable
        "creationTime": creationTime
    }, reference = database.ref(KEY_HUB + NODE_SEP).push();
    
    
    if (destructionTimeInHours) {
        var destructionDate = getDestructDate(creationTime, destructionTimeInHours);
        
        object.destructionTimeInHours = destructionTimeInHours;
        object.destructionDate = destructionDate;
        
        reference.set(object, function (error) {
            startHubDesctruct(reference.key, destructionDate);
        });
    } else {
        reference.set(object);
    }
    database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + reference.key).set(true);
    return reference.key;
};


// Deletes Hub, by it's id and owner id
exports.deleteHubByIdAndUid = function (hubId, ownerUid) {
    
    var promises = [];
    promises.push(database.ref(KEY_HUB + NODE_SEP + hubId).remove());
    promises.push(database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + hubId).remove());
    return Promise.all(promises);
};

exports.deleteHubById = function (hubId) {
    var promises = [], deleteHubPromise = database.ref(KEY_HUB + NODE_SEP + hubId).remove(), deleteOwnerInHubPromise = new Promise(
        function (resolve, reject) {
            exports.getHubById(hubId).then(function (hub) {
                console.log("callback reached");
                console.log("hub ownerUid: " + hub.ownerUid);
                console.log("statement: " + KEY_USER + NODE_SEP + hub.ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + hubId);
                database.ref(KEY_USER + NODE_SEP + hub.ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + hubId).remove(function () {
                    resolve();
                });
            }, function () {
                reject();
            });
        }
    );
    promises.push(deleteHubPromise);
    promises.push(deleteOwnerInHubPromise);
    return Promise.all(promises);
};

// Returns promise that retrieves an hub by id, variables are accessable as object literal
exports.getHubById = function (hubId) {
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
exports.getMyHubIds = function (ownerUid) {
    return new Promise(
        function (resolve, reject) {
            database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB).once('value').then(function (snapshot) {
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
exports.updateHub = function (id, updates) {
    return database.ref(KEY_HUB + NODE_SEP + id).update(updates);
};

// Returns promise that returns all hubs an user is assigned to
exports.getMyHubs = function (ownerUid) {
    return new Promise(
        function (resolve, reject) {
            exports.getMyHubIds(ownerUid).then(function (hubIds) {
                
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
exports.addFileToHub = function (id) {
    
    
    
};
exports.removeFileFromHub = function () {};