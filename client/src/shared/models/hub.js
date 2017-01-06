
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
const ID = "id";
const QUICK_SHARE_KEYS = "quickShareKeys";

// >>>>> Hub Access Consts
const ACCESS_EVERYONE = "everyone"; // hub access for everyone
const ACCESS_ACCOUNT = "account" // hub access for people with gively account
const ACCESS_MEMBERS = "members" // hub access only for one's self and all whitelisted admins and member



export default class HubM{

    constructor(hub){
		this[ID] = hub[ID];
		this[URL] = hub[URL]; // Also used as UID for the hub
		this[OWNER] = hub[OWNER];
		this[NAME] = hub[NAME];
		this[QUICK_SHARE_KEYS] = hub[QUICK_SHARE_KEYS];
        this[DESCRIPTION] = hub[DESCRIPTION];
        this[IS_PUBLIC] = hub[IS_PUBLIC];
		let date = hub[CREATION_DATE] ? hub[CREATION_DATE] : new Date();
		this[CREATION_DATE] = date;

		this[DESTRUCTION_TIME_IN_HOURS] = hub[DESTRUCTION_TIME_IN_HOURS] === 0 ? undefined : (hub[DESTRUCTION_TIME_IN_HOURS] ? hub[DESTRUCTION_TIME_IN_HOURS]: 48);
		this[DESTRUCTION_DATE] = hub[DESTRUCTION_DATE];
		if(!DESTRUCTION_DATE)
			if (hub[DESTRUCTION_TIME_IN_HOURS] !== undefined && hub[DESTRUCTION_TIME_IN_HOURS] === 0) {
				var destructionDate = HubM.getDestructDate(hub[CREATION_DATE], hub[DESTRUCTION_TIME_IN_HOURS]);
				hub[DESTRUCTION_DATE] = destructionDate.getTime();
			}
		this[MEMBERS] = hub[MEMBERS];
    }

	static getDestructDate(date, hours){
	    let inMilliseconds = date.getTime();
	    inMilliseconds = inMilliseconds + (hours * 1000 /* * 60 * 60 */);
	    return new Date(inMilliseconds);
	}




}


// >> Hub Exports
export { KEY, ID, NAME, DESCRIPTION, URL, IS_PUBLIC, OWNER, DESTRUCTION_TIME_IN_HOURS, DESTRUCTION_DATE, MEMBERS, CREATION_DATE, FILES, ACCESS_EVERYONE, ACCESS_ACCOUNT, ACCESS_MEMBERS }
