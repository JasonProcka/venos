/*global require, module, Promise */
/*jslint node: true */
/*jshint es5: false */
/*jshint esnext: true */
"use strict";
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
exports.createHub = function (name, ownerUid) {
    var reference = database.ref(KEY_HUB + NODE_SEP).push({
        "name": name,
        "ownerUid": ownerUid
    });
    database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + reference.key).set(true);
    return reference.key;
};
exports.deleteHubById = function (id, ownerUid) {
    database.ref(KEY_HUB + NODE_SEP + id).remove();
    database.ref(KEY_USER + NODE_SEP + ownerUid + NODE_SEP + KEY_HUB + NODE_SEP + id).remove();
};
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
exports.editHub = function () {};
// ------------------- File Methods --------------------------- 
exports.addFileToHub = function () {};
exports.removeFileFromHub = function () {};