//actions
var axios = require('axios');


export var changeName = (name) =>{
	return  {
		type: 'CHANGE_NAME',
		name
	}
}
//action generators for hobbies
export var addHobby = (hobby) =>{
	return {
		type: 'ADD_HOBBY',
		hobby
	}
}

export var removeHobby = (id) =>{
	return {
		type: 'REMOVE_HOBBY',
		id
	}
}

//action generators for movies
export var addMovie = (movie) =>{
	return {
		type: 'ADD_MOVIE',
		movie
	}
}
export var removeMovie = (id) =>{
	return {
		type: 'REMOVE_MOVIE',
		id
	}
}

export var startLocationFetch = ()=>{
	return {type: 'START_LOCATION_FETCH'}
}

export var completeLocationFetch = (url)=>{
	return {type: 'COMPLETE_LOCATION_FETCH', url}
}

//called from redux-example to begin the fetch location
export var fetchLocation = ()=>{
	return (dispatch, getState)=>{
		//calls startLocationFetch above which then dispatches to the reducer
		//maps reducer to set the states
		dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then(function(res){
		var loc = res.data.loc;
		console.log("axios returned ", loc )
		var baseUrl = 'http://maps.google.com/?q=';
		dispatch(completeLocationFetch(baseUrl + loc));
	}, function(e){console.log("error ", e)})
	}
}

