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
import DatabaseServer from "./server/database";
import {FileM, FileC, SessionM} from './client/src/shared/models';
import DatabaseUtil from './client/src/shared/database';
import cookieParser from 'cookie-parser';
import Auth from './server/auth';
import CookieBuilder from './server/cookiebuilder'
import FileManager from './server/filemanager';
import compression from 'compression';
// support json encoded bodies
const app = express();
app.use(cookieParser());
app.use(compression());
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));

// support encoded bodies
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    console.log("Cookies:");
    console.log(util.inspect(req.cookies));

    Auth.verifyAuth(req.cookies.sessionId).then((data) => {
        if (data.isSuccessful) {
            req.isAuthenticated = true;
            req.user = data.user;
        }
        next();
    }).catch((err) => {
        console.error(err);
        next();
    });

});


app.set('port', (process.env.PORT || 3100));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production')
    app.use(express.static('client/build'));

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

app.post('/files', (req, res, next) => {
    DatabaseServer.getFilesOfHub(req.body.hubid).then((files) => {
        res.status(200).end(JSON.stringify(files));
    }).catch((err) => {
        console.error(err);
        res.status(500).end(err);
    });

});

// // Example /displayfile?file=/user/YFp5Xl5eJoQf6RfNg5MH44ZsZgm1/files/-K_eLou0qsMvL6mIUcbT.JPG
// app.get('/displayfile', (req, res, next) => {
//
//     let destinationName = req.query.file;
//     if (destinationName && destinationName.trim().length > 0) {
//         let remoteFile = bucket.file(`${req.query.file}`);
//         let id = destinationName.substring(destinationName.lastIndexOf('/') + 1)
//         id = id.substring(0, id.indexOf('.'));
//
//         DatabaseServer.getFileFromId(id).then((file) => {
//             res.set('Content-Type', `${file[FileC.TYPE]
//                 ? file[FileC.TYPE]
//                 : 'application/octet-stream'}`)
//             res.set('Content-Disposition', `inline; filename="${file[FileC.NAME]}`);
//             remoteFile.createReadStream().on('error', (err) => {
//                 console.log(error);
//                 res.status(500).send();
//             }).on('response', (response) => {
//                 res.status(200)
//             }).pipe(res);
//         }).catch((err) => {
//             console.error(err);
//             res.status(500).send(err)
//         })
//     } else {
//         console.error(err);
//         res.status(500).send();
//     }
//
// });
//
// // Example /downloadfile?file=/user/YFp5Xl5eJoQf6RfNg5MH44ZsZgm1/files/-K_eLou0qsMvL6mIUcbT.JPG
// app.get('/downloadfile', (req, res, next) => {
//
//     //res.download(bucket.file(`${req.query.file}`).download(undefined, function(err) {console.error(err); res.status(500).send();}));
//
//     let destinationName = req.query.file;
//     if (destinationName && destinationName.trim().length > 0) {
//         let remoteFile = bucket.file(`${req.query.file}`);
//         let id = destinationName.substring(destinationName.lastIndexOf('/') + 1)
//         id = id.substring(0, id.indexOf('.'));
//
//         DatabaseServer.getFileFromId(id).then((file) => {
//             console.log(file[FileC.TYPE]);
//             res.set('Content-Type', `${file[FileC.TYPE]
//                 ? file[FileC.TYPE]
//                 : 'application/octet-stream'}`)
//             res.set('Content-Disposition', `attachment; filename="${file[FileC.NAME]}`);
//             remoteFile.createReadStream().on('error', (err) => {
//                 console.error(err);
//                 res.status(500).send();
//             }).on('response', (response) => {
//                 res.status(200)
//             }).pipe(res);
//         }).catch((err) => {
//             console.error(err);
//             res.status(500).send(err)
//         })
//     } else {
//         console.error(err);
//         res.status(500).send();
//     }
// });
//
// app.get('/downloadfile2', (req, res, next) => {
//
//     //res.download(bucket.file(`${req.query.file}`).download(undefined, function(err) {console.error(err); res.status(500).send();}));
//
//     let id = req.query.id;
//     if (id && id.trim().length > 0) {
//
//         DatabaseServer.getFileFromId(id).then(() => {
//
//             let remoteFile = bucket.file(`${req.query.file}`);
//             let id = destinationName.substring(destinationName.lastIndexOf('/') + 1)
//             id = id.substring(0, id.indexOf('.'));
//
//             DatabaseServer.getFileFromId(id).then((file) => {
//                 console.log(file[FileC.TYPE]);
//                 res.set('Content-Type', `${file[FileC.TYPE]
//                     ? file[FileC.TYPE]
//                     : 'application/octet-stream'}`)
//                 res.set('Content-Disposition', `attachment; filename="${file[FileC.NAME]}`);
//                 remoteFile.createReadStream().on('error', (err) => {
//                     console.error(err);
//                     res.status(500).send();
//                 }).on('response', (response) => {
//                     res.status(200)
//                 }).pipe(res);
//             }).catch((err) => {
//                 console.error(err);
//                 res.status(500).send(err)
//             })
//
//         })
//
//     } else {
//         console.error(err);
//         res.status(500).send();
//     }
//
// });


app.get('/downloadfile', (req, res, next) => {
//
    	if(req.query.id){
			FileManager.download(res, req.query.id).catch(() => res.status(500).send());
		}else{
			res.status(500).send();
		}
//
//     let id = req.query.id;
//     if (id && id.trim().length > 0) {
//
//         DatabaseServer.getFileFromId(id).then(() => {
//
//             let remoteFile = bucket.file(`${req.query.file}`);
//             let id = destinationName.substring(destinationName.lastIndexOf('/') + 1)
//             id = id.substring(0, id.indexOf('.'));
//
//             DatabaseServer.getFileFromId(id).then((file) => {
//                 console.log(file[FileC.TYPE]);
//                 res.set('Content-Type', `${file[FileC.TYPE]
//                     ? file[FileC.TYPE]
//                     : 'application/octet-stream'}`)
//                 res.set('Content-Disposition', `attachment; filename="${file[FileC.NAME]}`);
//                 remoteFile.createReadStream().on('error', (err) => {
//                     console.error(err);
//                     res.status(500).send();
//                 }).on('response', (response) => {
//                     res.status(200)
//                 }).pipe(res);
//             }).catch((err) => {
//                 console.error(err);
//                 res.status(500).send(err)
//             })
//
//         })
//
//     } else {
//         console.error(err);
//         res.status(500).send();
//     }
//
});

app.post('/gettohubbyquickshare', (req, res, next) => {
	if(req.body.key){
		DatabaseServer.getHubFromQuickShareKey(req.body.key).then((data) => {
			res.status(200).send(data);
		}).catch((err) => {
			console.error(err);
			res.status(500).send();
		})
	}else{
		console.error('Key not found');
		res.status(500).send();
	}
});

app.post('/generatequicksharekey', (req, res, next) => {
	if(req.body.hubid){
		console.log('test');
		DatabaseServer.generateNewQuickShareKeyForHub(req.body.hubid).then((data) => {
			res.status(200).send(data);
		}).catch((err) => {
			console.error(err);
			res.status(500).send();
		})
	}else{
		console.log('Hubid not provided');
		res.status(500).send();
	}
});



app.post('/file', (req, res, next) => {

    let remoteReadStream = bucket.file(req.body.file).createReadStream();
    remoteReadStream.pipe(res);
    remoteReadStream.on('error', (err) => res.end(err.toString()));

});

app.post("/signup", (req, res) => {
    console.info("/signup");
    Auth.signUpUser(req.body).then((data) => {
        CookieBuilder.send(res, data.token, req.body.remember
            ? req.body.remember
            : false);
        res.status(200).send(data.user);
    }).catch((err) => {
        res.status(500).send(undefined);
        console.error(err);
    });
});

app.post("/signupanon", (req, res) => {
    console.info("/signupanon");
    Auth.signUpAnon(req.body).then((data) => {
        CookieBuilder.send(res, data.token, true);
        res.status(200).send(data.user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(undefined);
    });
})

app.post("/signin", (req, res) => {
    console.info("/signin");
    Auth.signInUser(req.body).then((data) => {
        CookieBuilder.send(res, data.token, req.body.remember
            ? req.body.remember
            : false);
        res.status(200).send(data.user);
    }).catch((err) => {
        res.status(500).send(undefined);
        console.error(err);
    });
});

app.post("/signout", (req, res) => {
    console.info("/signout");
    let d = new Date();
    CookieBuilder.delete(res);
    res.status(200).send();
});

app.post('/isauthenticated', (req, res) => {
    console.info(`/isauthenticated: ${req.isAuthenticated}`);
    if (req.isAuthenticated) {
        res.status(200).send(req.user);
    } else {
        res.status(200).send(undefined);
    }
});

app.post('/create', (req, res) => {
    console.log(util.inspect(req.body));
    if (req.body)
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
    if (req.body && req.body.url)
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

    if (req.isAuthenticated) {
        console.info('Starting uploading');

        let form = new formidable.IncomingForm();
        form.multiples = true;
        form.parse(req, (err, fields, fileList) => {
            let files = [];
            for (let fileIndex in fileList) {
                files.push(fileList[fileIndex]);
            }

			console.log(util.inspect(req.user));
			FileManager.uploadFilesToHub(files, fields['hubid'], req.user.uidInternal).then((files) => {
				console.info("uploaded files successfully");
				res.status(200).send(files);
			}).catch((error) => {
				console.error(error);
			});
        });
    }
	else{
		console.error("User not authenticated, file could not be uploaded");
		res.status(500).send();
	}

});
