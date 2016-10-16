var redux = require('redux');
var axios = require('axios');


console.log("Starting redux example");


var stateDefault = {
	name: "anon",
	hobbies: [],
	movies: []
}

/* OLD CODE
var oldReducer = (state = stateDefault, action)=>{
	//state = state || {state: 'anon'}
	//console.log("new action", action);
	switch(action.type){
		case 'CHANGE_NAME':
			return{...state,
				name: action.name
			};
		case 'ADD_HOBBY':
			return{...state,
				hobbies: [
					...state.hobbies,
					{
						id: nextHobbyId++,
						hobby: action.hobby
					}
				]
			};

		case 'REMOVE_HOBBY':
			return{
				...state,
				hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
			}
		case 'ADD_MOVIE':
			return {
				...state,
				movies:[
					...state.movies,
					{
						id: nextMovieId++,
						title: action.title,
						genre: action.genre
					}
				]
			}
		case 'REMOVE_MOVIE':
			return{
				...state,
				movies: state.movies.filter((movie)=> movie.id !== action.id)
			}
		default:
			return state;
	}
}
*/

//names reducer
//--------------------------------------------------
var nameReducer = (state = "anonymous", action)=>{
	switch(action.type){
		case 'CHANGE_NAME':
			return action.name
		default: return state;
	}
}

var changeName = (name) =>{
	return  {
		type: 'CHANGE_NAME',
		name
	}
}

//hobbies reducer
//------------------------------------------------
var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) =>{
	switch(action.type){
		case 'ADD_HOBBY':
		 return [
		 	...state,
		 	{
		 		id: nextHobbyId++,
				hobby: action.hobby
		 	}
		];
		case 'REMOVE_HOBBY':
		return state.filter((hobby) => hobby.id !== action.id);
		default: return state;
	}
}

//action generators for hobbies
var addHobby = (hobby) =>{
	return {
		type: 'ADD_HOBBY',
		hobby
	}
}

var removeHobby = (id) =>{
	return {
		type: 'REMOVE_HOBBY',
		id
	}
}

//movies reducer
//------------------------------------------------
var nextMovieId = 1;
var moviesReducer = (state = [], action)=>{
	switch(action.type){
		case 'ADD_MOVIE':
			return [
				...state,
				{
					id: nextMovieId++,
					movie: action.movie
				}
			];
		case 'REMOVE_MOVIE':
			return state.filter((movie) => movie.id !== action.id);
		default: return state;
	}
}
//action generators for movies
var addMovie = (movie) =>{
	return {
		type: 'ADD_MOVIE',
		movie
	}
}
var removeMovie = (id) =>{
	return {
		type: 'REMOVE_MOVIE',
		id
	}
}

//map reducer
//------------------------------------------------

var mapReducer = (state = {isFetching: false, url: undefined}, action)=>{
	switch(action.type){
		case 'START_LOCATION_FETCH':
			return {
				isFetching: true,
				url: undefined
			}
		case 'COMPLETE_LOCATION_FETCH':
			return {
				isFetching: false,
				url: action.url
			}
		default: return state;
	}
}

var startLocationFetch = ()=>{
	return {type: 'START_LOCATION_FETCH'}
}

var completeLocationFetch = (url)=>{
	return {type: 'COMPLETE_LOCATION_FETCH', url}
}

var fetchLocation = ()=>{
	store.dispatch(startLocationFetch());
	axios.get('http://ipinfo.io').then(function(res){
		var loc = res.data.loc;
		var baseUrl = 'http://maps.google.com/?q='
		store.dispatch(completeLocationFetch(baseUrl + loc));
	})
}


var reducer = redux.combineReducers({
	name: nameReducer,
	hobbies: hobbiesReducer,
	movies: moviesReducer,
	map: mapReducer
})

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
	));

//subscribe to changes
var unsubscribe = store.subscribe(()=>{
	var state = store.getState();
	console.log("name is ", state);

	if(state.map.isFetching){
		document.getElementById('element').innerHTML = "Loading...";
	}else if(state.map.url){
		document.getElementById('element').innerHTML = `<a href = "${state.map.url}" target = "_blank">View Your Location</a>`
	}
});


//unsubscribe();
var currentState = store.getState();
console.log("currentState", currentState);
fetchLocation();
store.dispatch(changeName("tom"));

store.dispatch(addHobby("running"));
store.dispatch(addHobby("walking"));
store.dispatch(removeHobby(1));
store.dispatch(changeName("amy"));
store.dispatch(addMovie({
	title: "star wars",
	genre: "sci-fi"
}));
store.dispatch(addMovie({
	title: "the jungle book",
	genre: "fantasy"	
}));
store.dispatch(removeMovie(1));

