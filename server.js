// --- Imports ----

// >>> External Modules
const express = require('express');
const fs = require('fs');
const shortid = require('shortid');
const formidable = require('formidable'),
    http = require('http'),
    util = require('util');

import winston from 'winston';
let logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({json: false, timestamp: true}),
        new winston.transports.File({
            filename: __dirname + '/debug.log',
            json: false
        })
    ],
    exceptionHandlers: [
        new(winston.transports.Console)({json: false, timestamp: true}),
        new winston.transports.File({
            filename: __dirname + '/exceptions.log',
            json: false
        })
    ],
    exitOnError: false
});

// >>> Internal Modules
import Admin from './server/admin';
import GCS from './server/gcs'
import DatabaseServer from "./server/database";
import {FileM, FileC, SessionM} from './client/src/shared/models';
import DatabaseUtil from './client/src/shared/database';
import cookieParser from 'cookie-parser';
import Auth from './server/auth';
// support json encoded bodies
const app = express();
app.use(cookieParser(null, {httpOnly: true, secure: true}));
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));

// support encoded bodies
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use((req, res, next) => {
	Auth.verifyAuth(req.cookies.sessionId).then((data) => {
		if(data.isSuccessful){
			req.isAuthenticated = true;
			req.user = data.user;
		}
		next();
	}).catch((err) => {
		console.error(err);
		next();
	});

});

let bucket = GCS.bucket('czernitzki-148120.appspot.com');
app.set('port', (process.env.PORT || 3100));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production')
    app.use(express.static('client/build'));

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

app.get('/files', (req, res, next) => {
    DatabaseServer.getFilesOfHub(req.query.hubid).then((files) => {
        let array = [];
        console.log(util.inspect(files, {
            showHidden: true,
            depth: null
        }));
        res.status(200).end(JSON.stringify(files));

    }).catch((err) => {
        console.log(err.toString());
        res.status(500).end(err);
    });

});
app.get('/file', (req, res, next) => {

    let remoteReadStream = bucket.file(req.query.file).createReadStream();
    remoteReadStream.pipe(res);
    remoteReadStream.on('error', (err) => res.end(err.toString()));

});


app.post("/signup", (req, res) => {
	let obj = undefined;
		if(req.body && req.body.email && req.body.password)
			obj = {email: req.body.email, password: req.body.password}
	Auth.signUp(obj).then((data) => {
		res.cookie('sessionId', data.token, { expires: new Date(Date.now() + 2592000000), httpOnly: true, secure: true /*, domain: ".venos.co"*/ });
		res.status(200).send(data.user);
	}).catch((err) => {
		console.error(err);
		res.status(500).send(undefined);
	});
});


app.post("/signin", (req, res) => {
	Auth.signIn({email: req.body.email, password: req.body.password}).then((data) => {
		res.cookie('sessionId', data.token, { expires: new Date(Date.now() + 2592000000), httpOnly: true, secure: true /*, domain: ".venos.co"*/ });
		if(data.isSuccessful)
			res.status(200).send(data.user);
		else {
			res.status(200).send(undefined);
		}
	}).catch((err) => {
		res.status(500)
		console.error(err);
	});
});


app.post("/signout", (req, res) => {
	res.cookie('sessionId', "", { expires: new Date(), httpOnly: true, secure: true /*, domain: ".venos.co"*/ });
});


app.post('/isauthenticated', (req, res) => {
	if(req.isAuthenticated){
		res.status(200).send(req.user);
	}else{
		res.status(200).send(undefined);
	}
});


app.post('/create', (req, res) => {
	console.log(util.inspect(req.body));
	if(req.body)
		DatabaseServer.createHub(req.body).then((hub) => {
			res.status(200).send(hub);
		}).catch((err) => {
			console.error(err);
			res.status(500).send();
		});
	else {
		console.log('he?');
		res.status(500).send();
	}
});

app.post('/gethubbyurl', (req, res) => {
	console.log(req.body.url);
	if(req.body && req.body.url)
		DatabaseServer.getHubByUrl(req.body.url).then((hub) => {
			res.status(200).send(hub);
		}).catch((err) => {
			console.error(err);
			res.status(500).send();
		});
	else {
		console.error('he?');
		res.status(500).send();
	}
});





app.post('/upload', (req, res, next) => {

    logger.log('Starting uploading');

    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        for (let property in files) {

            DatabaseServer.addFileToHub(new FileM({
                [FileC.NAME]: files[property].name

            }), fields.hubid, (reference) => {

                let destinationName = files[property].name;
                destinationName = `/user/${fields.useruid}/files/${reference.key}${destinationName.substring(destinationName.indexOf('.'))}`;
                let options = {
                    destination: destinationName,
                    resumable: true,
                    validation: 'crc32c',
                    metadata: {
                        "type": files[property].type
                    }
                };

                return new Promise((resolve, reject) => {

                    bucket.upload(files[property].path, options, (err, file) => {
                        if (!err)
                            console.info("Successful uploaded file");
                        else {
                            console.error(err);
                            reject(err);
                        }
                    });
                })
            });
            // files[property].path;
            // files[property].type;
            // files[property].lastModifiedDate;

        }

        res.writeHead(200, {'content-type': 'text/plain'});

        res.write('received upload:\n\n');
        console.log('files: ' + files);

        console.log('err: ' + err);
        console.log('fields: ' + fields);
        res.end(util.inspect({fields: fields, files: files}));
    });
    // req.files.forEach(function(test){
    //     console.log('upload1');
    //     console.log(test);
    // });
})
//
// app.post('/upload', function (req, res) {
//     console.log('test');
//
//
//     console.log(req.body);
//
//     //  req.body.files.forEach(function(test){
//     //     console.log('upload1');
//     //     console.log(test);
//     // });
//     console.log('testxxxxxxxxxxxxxxxxxxxxxxxx');
//     res.sendStatus(200);
//
// });
