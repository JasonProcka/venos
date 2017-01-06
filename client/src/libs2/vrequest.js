import request from 'superagent';


export default class VRequest{



	static post(to, data){
		return new Promise(
			(resolve, reject) => {
				request
					.post(to)
					.send(data)
					.end(function(err, res){
							if(!res.ok){
								reject("Response is not ok");
							}else if(err){
								reject(err);
							}else{
								resolve(res);
							}
					});
			}
		)
	}
}
