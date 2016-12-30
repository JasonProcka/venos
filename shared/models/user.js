// >>> User
const KEY = "user";
const UID = "uid";
const DISPLAY_NAME = "displayName";
const DESCRIPTION = "description";
const EMAIL = "email";
const FILES = "files";


export default class UserM{

    constructor(user){
        Object.assign(this, {...user});
    }

}

export {KEY, UID, DISPLAY_NAME, DESCRIPTION, EMAIL, FILES};
