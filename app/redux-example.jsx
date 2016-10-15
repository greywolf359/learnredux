var redux = require('redux');


console.log("Starting redux example");


var stateDefault = {
	name: "anon",
	hobbies: [],
	movies: []
}
var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault, action)=>{
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

store.dispatch({
	type: 'CHANGE_NAME',
	name: "tom"
});

store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'running'
});

store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'walking'
});

store.dispatch({
	type: 'REMOVE_HOBBY',
	id: 2
})

store.dispatch({
	type: 'CHANGE_NAME',
	name: "jane"
});

store.dispatch({
	type: "ADD_MOVIE",
	title: "star wars",
	genre: "sci-fi"
	
});

store.dispatch({
	type: "ADD_MOVIE",
	title: "the jungle book",
	genre: "fantasy"
	
})

store.dispatch({
	type: "REMOVE_MOVIE",
	id: 1
})



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