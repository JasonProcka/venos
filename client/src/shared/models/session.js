// >>> Session
const KEY = "token";

import uuid from 'uuid';

export default class SessionM{

    constructor(session){
		Object.assign(this, {...session});
    }

	static createSessionToken(){
		return uuid.v4({
  			random: [
    			0x18, 0x91, 0x56, 0xbe, 0xc4, 0xfa, 0xc5, 0xea,
    			0x71, 0xf4, 0xef, 0xe1, 0x67, 0x1d, 0x58, 0x96
  			]
		});
	}




}


export {KEY};
