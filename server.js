
// --- Imports ----

// >>> External Modules
const express = require('express');
const fs = require('fs');
const shortid = require('shortid');
const formidable = require('formidable'),
    http = require('http'),
    util = require('util');

const gcs = require('@google-cloud/storage')({projectId: 'czernitzki-148120', keyFilename: './service.json'});

// >>> Internal Modules
import DatabaseServer from "./server/database";
import {FileM, FileC} from './client/src/shared/models'



// support json encoded bodies
const app = express();
let bodyParser = require('body-parser');
app.use(
	bodyParser.json({limit: '50mb'})
);

// support encoded bodies
app.use(
	bodyParser.urlencoded(
		{extended: true, limit: '50mb'}
	)
);


var bucket = gcs.bucket('venos-bucket');
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
        console.log(util.inspect(files, { showHidden: true, depth: null }));
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

app.post('/upload', (req, res, next) => {


    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        for (let property in files) {




			DatabaseUtil.createFile(
				new FileM({
					[FileC.NAME]: files[property].name

				}),
				fields.hubid,
				(reference) => {

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

					return new Promise(
						(resolve, reject) => {

							bucket.upload(files[property].path, options, (err, file) => {
			                	if (!err)
			                    	console.info("Successful uploaded file");
			                	else {
			                    	console.err(err);
									reject(err);
			                	}
			            	});
						}
					)
				}
			);
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
