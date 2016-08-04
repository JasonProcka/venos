/*global require, module, Promise */
/*jslint node: true */
/*jshint es5: false */
/*jshint esnext: true */
"use strict";



// database node keys
var KEY_HUB = "hub";
var KEY_USER = "user";
var NODE_SEP = "/";


var firebase = require("firebase");
var exports = module.exports = {};


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgj1rbQDMkDE80I7lYiDdeEvAHiQNDJGU",
    authDomain: "project-mango-5d7d3.firebaseapp.com",
    databaseURL: "https://project-mango-5d7d3.firebaseio.com",
    storageBucket: "project-mango-5d7d3.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database();


// ------------------- Hub Methods --------------------------- 


// Creates Hub, returns id of hub
exports.createHub = function (name, url, ownerUid, isPublic) {
    var reference = database.ref(KEY_HUB + NODE_SEP).push({
        "name": name,   // Name of hub
        "ownerUid": ownerUid,   // Unique id of the owner of this hub
        "url": url, // TODO specified url of the hub, needs to encoded because firebase doesn't allow every special character
        "public": isPublic  // Is the hub public accessable
    });
    database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + reference.key).set(true);
    return reference.key;
};


// Deletes Hub, by it's id and owner id
exports.deleteHubById = function (id, ownerUid) {
    database.ref(KEY_HUB + NODE_SEP + id).remove();
    database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + id).remove();
};

// Returns promise that retrieves an hub by id, variables are accessable as 
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