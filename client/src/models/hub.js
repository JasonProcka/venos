
export default class V_Hub{

    constructor(uid, name, description, url, isPulbic, destructionTimeInHours, ownerUid){
		this.uid = uid;
		this.name = name;
        this.description = description;
        this.url = url;
        this.isPublic = isPulbic;
        this.destructionTimeInHours = destructionTimeInHours;
		this.ownerUid = ownerUid;
    }

}
