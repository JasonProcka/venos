

// >>> File
const KEY = "file";
const ID = "fileId";
const NAME = "fileName"; // used as UID
const DESCRIPTION = "fileDescription";
const LOCATION = "fileLocation";
const SIZE = "fileSize";
const HUBS = "fileHubs";
const OWNER = "fileOwner";
const EXTRA = "fileExtra";



export default class FileM{

    constructor(file){
		Object.assign(this, {...file});
    }

}

export {KEY, EXTRA, ID, NAME, DESCRIPTION, LOCATION, SIZE, HUBS, OWNER};
