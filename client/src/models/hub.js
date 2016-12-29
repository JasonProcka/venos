
// {name, description, url, (user.uid - passed by method), isPublicHub, destructionTimeInHours}
class Hub{
    
    constructor(_name, _description, _url, _isPulbic, _destructionTimeInHours, _userUid){
        this.name = _name;
        this.description = _description;
        this.url = _url;
        this.isPublic = _isPulbic;
        this.destructionTimeInHours = _destructionTimeInHours;
    }
    
    get name() {
        return this.name;
    }
    set name(_name){
        this.name = _name;
    }
    
    
    get description() {
        return this.name;
    }
    set description(_description){
        this.description = _description;
    }
    
    
    get url() {
        return this.url;
    }
    set url(_url){
        this.url = _url;
    }
    
    
    get isPublic() {
        return this.isPublic;
    }
    set isPublic(_isPublic){
        this.isPublic = _isPublic;
    }
    
    
    get destructionTimeInHours() {
        return this.destructionTimeInHours;
    }
    set destructionTimeInHours(_destructionTimeInHours){
        this.destructionTimeInHours = _destructionTimeInHours;
    }
    
}