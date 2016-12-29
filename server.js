
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
const database = require("./client/src/actions/database");





const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'})); // support encoded bodies
var bucket = gcs.bucket('venos-bucket');

app.set('port', (process.env.PORT || 3100));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

app.get('/files', function(req, res, next) {
    console.dir(req.params);
    console.log("hubid: " + req.query.hubid);
    database.getFilesOfHub(req.query.hubid).then((files) => {
        console.log("lengthy: " + files.length);
        var array = [];
        console.log(util.inspect(files, { showHidden: true, depth: null }));

        files.forEach(function(e){
            console.log('e: ' + e);
            array.push(e);
        });
        console.log("thefiles" + JSON.stringify(array));
        res.status(200).end(JSON.stringify(array));

    }).catch((err) => {
        console.log(err.toString());
        res.status(500).end(err);
    });

});
app.get('/file', function(req, res, next) {

    console.log("file: " + req.query.file);

    var remoteReadStream = bucket.file(req.query.file).createReadStream();

    remoteReadStream.pipe(res);
    remoteReadStream.on('error', function(err) {
    res.end(err.toString());
  });
});

app.post('/upload', function(req, res, next) {
    console.log("he")
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
        for (var property in files) {
            var id = shortid.generate();
            // files[property].path;
            // files[property].type;
            // files[property].lastModifiedDate;
            var destinationName = files[property].name;
            destinationName = `/user/${fields.useruid}/files/` + id + destinationName.substring(destinationName.indexOf('.'));
            console.log(destinationName);
            var options = {
                destination: destinationName,
                resumable: true,
                validation: 'crc32c',
                metadata: {
                    "type": files[property].type
                }
            };
            console.log("user: " + fields);

            bucket.upload(files[property].path, options, function(err, file) {
                if (!err) {
                    console.log('works');
                    console.log(file.destination);
                    for (var property in file) {
                        if (file.hasOwnProperty(property)) {
                            console.log(property + ": " + file[property])
                        }
                    }
                    database.addFileToHub(fields.useruid, fields.hubid, file);

                    // "zebra.jpg" is now in your bucket.
                } else {
                    console.log('error');
                    console.log(err);
                }
            });
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
