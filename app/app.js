/*global require, module, static */
/*jslint node: true */
"use strict";
var database = require("./database.js");

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www/public'));
/*app.get('/auth/', function(req, res) {
  res.sendFile(path.join(__dirname, '/www/public', 'register.html'));
});*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


app.get("/", function(req, res, next){
    res.sendFile("../index.html");
});


// Starts all hub destructs after server restart and listens for new hubs that will get destructed
database.startAllHubDestructs();


//      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// ----    For testing all values are in currently set to seconds   ------
//
//      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// 40 hours destruction time
database.createHub("Awesome Hub - 1", "http://marcadian.com", 1, true, 40);


// 20 hours destruction time
database.createHub("Awesome Hub - 2", "http://marcadian.io", 1, true, 20);

// No destruction time
database.createHub("Awesome Hub - 2", "http://marcadian.io", 1, true);


/*
var token = account.register();
console.log("user token: " + token);
account.registerAuthListener(function (user) {
    var uid = user.uid, isAnonymous = user.isAnonymous;
    console.log("user signed in\nwas anonymous: " + isAnonymous + "\nuid: " + uid);
}, function () {});*/
// Test Database stuff, for explaination look in database.js we'll move the tests to mocka.js soon
/*
var id = database.createHub("TheHubName", "the-hub-name", 2);
*/
/*database.getHubById(id).then(function (hub) {
    console.log("Hub found - getHubById()");
    console.log(hub.id);
    console.log(hub.name);
    console.log(hub.ownerUid);
}, function () {
    console.log("error retriving Hub - getHubById()");
});*/
/*database.getMyHubs(2).then(function (hubArray) {
    console.log("Hub found - getHubById()");
    hubArray.forEach(function (hub) {
        console.log(hub.id);
        console.log(hub.name);
        console.log(hub.ownerUid);
    });
}, function () {
    console.log("error retriving Hub - getHubById()");
});
database.deleteHubById("-KO0MT9YYCjFtbCtryh6", 2);
database.updateHub("-KO2-ncySvtwK86N-tma", {
    name: "AwesomeHub"
});*/
/*
var id = database.createHub("TheHubName", 2);
console.log(id);
//database.deleteHubById(id, 2);


database.getHubById(id, function (hub) {
    console.log(hub.id);
    console.log(hub.name);
    console.log(hub.ownerUid);
}, function () {
    console.log("does not exist");
});


database.getMyHubs(2, function (hubIds) {
    console.log(hubIds);
}, function () {
    
});
*/
/*

database.createHub("NewHub", 1);


database.getHubById("-KO01LzgKspiWbHa_oUo", function (hub) {
    console.log(hub.id);
    console.log(hub.name);
    console.log(hub.ownerUid);
}, function () {
    console.log("does not exist");
});
*/