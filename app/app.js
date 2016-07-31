/*global require, module */
/*jslint node: true */
"use strict";

var database = require("./database.js");












// Test Database stuff

var id = database.createHub("TheHubName", 2);
/*database.getHubById(id).then(function (hub) {
    console.log("Hub found - getHubById()");
    console.log(hub.id);
    console.log(hub.name);
    console.log(hub.ownerUid);
}, function () {
    console.log("error retriving Hub - getHubById()");
});*/


database.getMyHubs(2).then(function (hubArray) {
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



