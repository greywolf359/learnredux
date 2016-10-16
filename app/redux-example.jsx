var redux = require('redux');
var actions = require('./actions/index');
var store = require('./store/configureStore').configureStore();
console.log("Starting redux example");

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
console.log("executing fetchLocation...");
store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName("tom"));

store.dispatch(actions.addHobby("running"));
store.dispatch(actions.addHobby("walking"));
store.dispatch(actions.removeHobby(1));
store.dispatch(actions.changeName("amy"));
store.dispatch(actions.addMovie({
	title: "star wars",
	genre: "sci-fi"
}));
store.dispatch(actions.addMovie({
	title: "the jungle book",
	genre: "fantasy"	
}));
store.dispatch(actions.removeMovie(1));

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

