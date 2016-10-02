/*global require, module */
/*jslint node: true */
var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgj1rbQDMkDE80I7lYiDdeEvAHiQNDJGU",
    authDomain: "project-mango-5d7d3.firebaseapp.com",
    databaseURL: "https://project-mango-5d7d3.firebaseio.com",
    storageBucket: "project-mango-5d7d3.appspot.com"
};
firebase.initializeApp(config);

module.exports = firebase;
