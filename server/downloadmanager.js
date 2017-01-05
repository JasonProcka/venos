


import GCS, {DefaultBucket} from './gcs'

export default class DownloadManager{



	static download(res, filePath, name, extension){
		res.set('Content-Type', `${extension ? extension : 'application/octet-stream'}`)
		res.set('Content-Disposition', `attachment; filename="${name}`);
		console.log("downloading: " + filePath);
		let remoteFile = DefaultBucket.file(filePath);
		remoteFile.createReadStream()
		.on('error', (err) => {console.error(err); res.status(500).send();})
		.on('response', (response)  => { res.status(200)})
		.pipe(res);
	}


	static display(res, filePath, name, extension){
		// res.set('Content-Type', `${extension ? extension : 'application/octet-stream'}`)
		// res.set('Content-Disposition', `inline; filename="${name}`);

		let remoteFile = DefaultBucket.file(filePath);
		remoteFile.createReadStream()
		.on('error', (err) => {console.error(err); res.status(500).send();})
		.on('response', (response)  => { res.status(200)})
		.pipe(res);
	}
}
