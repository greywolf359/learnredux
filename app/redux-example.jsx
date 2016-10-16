var redux = require('redux');


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

var reducer = redux.combineReducers({
	name: nameReducer,
	hobbies: hobbiesReducer,
	movies: moviesReducer
})

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
	));

//subscribe to changes
var unsubscribe = store.subscribe(()=>{
	var state = store.getState();
	console.log("name is ", state);

	document.getElementById('element').innerHTML = state.name
});

//unsubscribe();
var currentState = store.getState();
console.log("currentState", currentState);

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

/*
1.  create a store from the redux library
2.  create a reducer assigned to an anon function or arrow function
3.  pass state and action to the function
	- assign defaults to the object passed into state
	- use a switch statement to update any state properties that is passed via action
4.  pass the reducer to the store when it is created
5.  to get the current state of the store use the method getState()
6.  to pass a new state prop value use dispatch method to pass an object consisting of 
	type and value props 
*/