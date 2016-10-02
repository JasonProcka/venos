// [START app]
/*global require, module, static */
/*jslint node: true */

/*var database = require("./own_modules/database.js");*/
var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');
var compression = require('compression');

import React from 'react';
import {renderToString } from 'react-dom/server';
import {match, RouterContext } from 'react-router';
import routes from './modules/routes';

var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
console.log('test');*/




app.get('*', function (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    const appHtml = renderToString(<RouterContext {...props}/>);
                                   
    res.send(renderPage(appHtml));
    
  });
});


app.post('/chub', function(req, res) {
    /*console.log('test');
    var name = req.body.name,
        isPublic = req.body.ispublic,
        selfdestruct = req.body.selfdestruct,
        url = req.body.url;
    
    console.log(name);
    console.log(isPublic);
    console.log(selfdestruct);
    console.log(url);*/
    
    res.send('POST request to the homepage');
});

function renderPage(appHtml) {
    return `
        <!doctype html public="storage">
        <html>
        <meta charset=utf-8/>
        <title>My First React Router App</title>
        <link rel=stylesheet href=/index.css>
        <div id=app>${appHtml}</div>
        <script src="/bundle.js"></script>`;
    
}






var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});

