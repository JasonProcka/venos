/*global require, module */
/*jslint node: true */
"use strict";


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

// ------------------- Hub Methods --------------------------- 

exports.createHub = function (name, ownerUserId) {
    firebase.database().ref('hubs/' + name).set({
        "ownerUserId": ownerUserId
    });
};

exports.checkIfHubExists = function (name) {
    
    
};


exports.deleteHub = function () {
    
    
};

exports.getHubById = function () {
    
    
};

exports.getMyHub = function () {
    
    
};


exports.editHub = function () {
    
    
};


// ------------------- File Methods --------------------------- 

exports.addFileToHub = function () {
    
    
};

exports.removeFileFromHub = function () {
    
    
};