
// --- Imports ----

// >>> Hub
const KEY = "hub";
const NAME = "name";
const DESCRIPTION = "description";
const URL = "url";
const IS_PUBLIC = "isPublic";
const OWNER = "ownerUid";
const DESTRUCTION_TIME_IN_HOURS = "destructionTimeInHours";
const DESTRUCTION_DATE = "destructionDate";
const MEMBERS = "member";
const CREATION_DATE = "creationDate";
const FILES = "files";

// >>>>> Hub Access Consts
const ACCESS_EVERYONE = "everyone"; // hub access for everyone
const ACCESS_ACCOUNT = "account" // hub access for people with gively account
const ACCESS_MEMBERS = "members" // hub access only for one's self and all whitelisted admins and member



export default class HubM{

    constructor(hub){
		this[URL] = hub[URL]; // Also used as UID for the hub
		this[OWNER] = hub[OWNER];
		this[NAME] = hub[NAME];
        this[DESCRIPTION] = hub[DESCRIPTION];
        this[IS_PUBLIC] = hub[IS_PUBLIC];
		let date = hub[CREATION_DATE] ? hub[CREATION_DATE] : new Date();
		this[CREATION] = date;
		this[DESTRUCTION_TIME_IN_HOURS] = hub[DESTRUCTION_TIME_IN_HOURS] ? hub[DESTRUCTION_TIME_IN_HOURS] : 48;
		date = {...date};
		date.setHours(date.getHours() + destructionTimeInHours);
		this[DESTRUCTION_DATE] = date;
		this[MEMBERS] = hub[HUB_MEMBERS];
    }




}


// >> Hub Exports
export { KEY, NAME, DESCRIPTION, URL, IS_PUBLIC, OWNER, DESTRUCTION_TIME_IN_HOURS, DESTRUCTION_DATE, MEMBERS, CREATION_DATE, FILES, ACCESS_EVERYONE, ACCESS_ACCOUNT, ACCESS_MEMBERS }
