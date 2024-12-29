'use strict';

const requestSetting = {
	"headers": {
    	"x-rapidapi-host": "imdb146.p.rapidapi.com",
    	"x-rapidapi-key": "1edc484509msh0b9ee0d9fc9a10bp12fc7cjsn0d9ff320e536"
  	}
}

const getMovieList = (movieName) => {
	console.log("Movie to be searched "+movieName);
	const url = "https://imdb146.p.rapidapi.com/v1/find/?query="+movieName;
	console.log("Movie url "+url);
	return getRequest(url);
}

const getRequest = (url) => {	
	return new Promise((resolve, reject) => {
		$.ajax({
			...requestSetting,
			"url" : url,
			"type" : "GET",
			"success" : function(data){
				resolve(data);
			},
			"error" : function(xhr, status, error){
				reject(error);
			}
		});
	});	
}

export default {
	"getMovieList" : getMovieList
}