

// >>> File
const KEY = "file";
const NAME = "fileName"; // used as UID
const DESCRIPTION = "fileDescription";
const LOCATION = "fileLocation";
const SIZE = "fileSize";
const HUBS = "fileHubs";
const OWNER = "fileOwner";
const EXTRA = "fileExtra";
const LOCAL_PATH = "filePath";
const LAST_MODIFIED_DATE = "fileLastModifiedDate";
const TYPE = "fileType";
const ID = "fileId";
const EXTENSION = "fileExtension";
const NAME_WIHOUT_EXTENSION = "fileNameWithoutExtension";

import shortid from 'shortid';


export default class FileM{

    constructor(file, ownerUid, hubIds){
		console.log("thepath: " + file.path);
		this[NAME] = file.name ? file.name : shortid.generate();
		this[SIZE] = file.size;
		this[LOCAL_PATH] = file.path;
		this[TYPE] = file.type ? file.type : "application/octet-stream";
		this[EXTENSION] = this[NAME].lastIndexOf('.') != -1 ? this[NAME].substring(this[NAME].lastIndexOf('.') + 1) : undefined;
		this[NAME_WIHOUT_EXTENSION] = this[NAME].lastIndexOf('.') != -1 ? this[NAME].substring(0, this[NAME].lastIndexOf('.')) : this[NAME];
		this[LAST_MODIFIED_DATE] = file.lastModifiedDate;
		this[HUBS] = {};
		if(ownerUid)
			this.setOwner(ownerUid);
		if(hubIds)
			hubIds.forEach((hubId) => {
				this.addHub(hubId);
			})
    }

	setOwner(uid){
		this[OWNER] = uid;
	}

	addHub(id){
		this[HUBS] = {...this[HUBS], [id]: true}
	}


}

export {KEY, ID, NAME_WIHOUT_EXTENSION, EXTENSION, TYPE, LAST_MODIFIED_DATE, LOCAL_PATH, EXTRA, NAME, DESCRIPTION, LOCATION, SIZE, HUBS, OWNER};
