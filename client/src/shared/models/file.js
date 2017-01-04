

// >>> File
const KEY = "file";
const NAME = "fileName"; // used as UID
const DESCRIPTION = "fileDescription";
const LOCATION = "fileLocation";
const SIZE = "fileSize";
const HUBS = "fileHubs";
const OWNER = "fileOwner";
const EXTRA = "fileExtra";
const PATH = "filePath";
const LAST_MODIFIED_DATE = "fileLastModifiedDate";
const TYPE = "fileType";
const ID = "fileId";



export default class FileM{

    constructor(file, ownerUid, hubIds){
		this[NAME] = file.name;
		this[SIZE] = file.size;
		this[PATH] = file.path;
		this[TYPE] = file.type;
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

export {KEY, ID, TYPE, LAST_MODIFIED_DATE,PATH, EXTRA, NAME, DESCRIPTION, LOCATION, SIZE, HUBS, OWNER};
