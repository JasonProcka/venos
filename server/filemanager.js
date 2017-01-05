
import DownloadManager from './downloadmanager';
import DatabaseServer from './database';
import {FileC, FileM} from '../client/src/shared/models'
import shortid from 'shortid';
import GCS, {DefaultBucket} from './gcs'
import sharp from 'sharp';
import fs from  'fs';
import util from 'util';

const ImageSize = {
	MIDDLE: "_m",
	SMALL: "_s"
}

export {
			ImageSize
		}


export default class FileManager{



	static download(res, fileId){
		return DatabaseServer.getFileFromId(fileId).then((file) => {
			console.log(FileManager.getDefaultFileDestination(file[FileC.ID], file[FileC.OWNER]));
			DownloadManager.download(res, FileManager.getDefaultFileDestination(file[FileC.ID], file[FileC.OWNER]), file[FileC.NAME], file[FileC.EXTENSION]);
		})
	}


	static displayImage(res, fileId, size = ""){
		return DatabaseServer.getFileFromId(fileId).then((file) => {
			if(FileManager.isFileImage(file[FileC.TYPE]))
				DownloadManager.display(res, FileManager.getImageFileDestination(file[FileC.ID], file[FileC.OWNER]), file[FileC.NAME], file[FileC.EXTENSION]);
			else {
				res.status(500).send("File is not an image")
			}
		});
	}



	static getFileDestination(fileName, fileId, fileOwnerUid){
			return `/user/${fileOwnerUid}/files/${fileId}/${fileName}`;
	}


	static getUploadResizedImagePromisesAsOnePromise(file){
		return Promise.all(
			[
				FileManager.getUploadResizedImagePromise(file, ImageSize.MIDDLE),
				FileManager.getUploadResizedImagePromise(file, ImageSize.SMALL)
			]
		)
	}

	static getFileDestinationFolder(fileId, fileOwnerUid){
			return `/user/${fileOwnerUid}/files/${fileId}`;
	}

	static getImageFileDestination(size, fileId, fileOwnerUid){
		return `${FileManager.getFileDestinationFolder(fileId, fileOwnerUid)}/file${size}`;

	}

	static getDefaultFileDestination(fileId, fileOwnerUid){
		return `${FileManager.getFileDestinationFolder(fileId, fileOwnerUid)}/file`;

	}



	static getUploadResizedImagePromise(file, size = ''){
		return new Promise(
			(resolve, reject) => {
				let promise;

				let location = `${__dirname}\\tmp\\${shortid.generate()}`;


				switch(size){
					case ImageSize.MIDDLE:	promise = FileManager.getResizedImagePromise(file, location, 1280, 720);
										break;
					case ImageSize.SMALL:	promise = FileManager.getResizedImagePromise(file, location, 300, 200);
										break;
					default: reject("Size not provided");
				}



				fs.writeFile(location, "", function(err) {
    				if(err) {

        				console.error(err);
						reject(err);
    				}else{
						console.log("dest" + FileManager.getImageFileDestination(size, file[FileC.ID], file[FileC.OWNER]));
						promise.then(() => {
							let options = {
								destination: FileManager.getImageFileDestination(size, file[FileC.ID], file[FileC.OWNER]),
								resumable: true,

								metadata: {
									contentType: file[FileC.TYPE]
								}
							};
							console.log('upload to2 ' + location);
							DefaultBucket.upload(location, options, (err, file) => {
								if (!err){
									console.info("Successful uploaded file2");
									fs.unlink(location, (err) => {
										if(err){
											console.error(err);
											reject(err)
										}else {
											console.info("Successful deleted file2");
											resolve("success");
										}
									})
								}else {
									console.error(err);
									reject(err);
								}
							});
						}).catch(err => {
							console.log('hier');
							console.error(err);
							reject(err);
						});
					}
				});

			}
		)


	}

	static getUploadDefaultFilePromise(file){
		return new Promise((resolve, reject) => {

			let name = "file";



			let options = {
				destination: FileManager.getDefaultFileDestination(file[FileC.ID], file[FileC.OWNER]),
				resumable: true,

				metadata: {
					contentType: file[FileC.TYPE]
				}
			};
			console.log('upload to ' + file[FileC.LOCAL_PATH]);
			DefaultBucket.upload(file[FileC.LOCAL_PATH], options, (err, file) => {
				if (!err){
					console.info("Successful uploaded file");
					resolve("Success");
				}else {
					console.error(err);
					reject(err);
				}
			});

		});
	}

	static isFileImage(file){
		let type = file[FileC.TYPE];

		if(type === 'image/jpeg' || type === 'image/pjpeg' || type === 'image/png' || type === 'image/webp' || type === 'image/tiff' || type === 'image/x-tiff'){
			return true;
		}
	}

	static getUploadPromise(file){

		if(!this.isFileImage(file))
			return this.getUploadDefaultFilePromise(file);

		// if file is an image make the below
		return Promise.all(
			[
				FileManager.getUploadDefaultFilePromise(file),
				FileManager.getUploadResizedImagePromisesAsOnePromise(file)
			]
		)
	}



	// data.err, data.buffer (output image data), data.info(.format, .size, .width, .height, .channels)
	static getResizedImagePromise(file, location, width, height){
			return sharp(file[FileC.LOCAL_PATH]).resize(width, height).toFile(location);
	}






	static uploadFilesToHub(files, hubId, userUid){

		let fileId = DatabaseServer.initUniqueFileId();


			let uploadItPromises = [];
			let files2 = [];
			for(let i = 0; i < files.length; i++){


				let file = new FileM(files[i], userUid, [hubId]);



				file[FileC.ID] = fileId; // Assign the ID from the previous resolved promise so that we can create files with uniques filenames in GCS

				let writeToDatabasePromise = Promise.all(
					[
						DatabaseServer.setFileAtSpecificId(file, fileId),
						DatabaseServer.addFileToHub(file, hubId)
					]
				);
				let uploadToGCSPromise = FileManager.getUploadPromise(file);

				// Combine them to one Promise for better understanding of bugs, as they are related
				uploadItPromises.push(Promise.all([
					writeToDatabasePromise,
					uploadToGCSPromise
				]));
				files2.push(file);

			}

			// Resolve every promise to
			return new Promise(
				(resolve, reject) => {
					Promise.all(uploadItPromises).then(() => {
						resolve(files2);
					}).catch((err) => {
						reject(err);
					})
				}
			)


	}
}
