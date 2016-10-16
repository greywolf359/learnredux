var redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbiesReducer, mapReducer, moviesReducer} = require('./../reducers/index');
export var configureStore = ()=>{

	//state will only be known by what is set here: name, hobbies, movies, map
	var reducer = redux.combineReducers({
		name: nameReducer,
		hobbies: hobbiesReducer,
		movies: moviesReducer,
		map: mapReducer
	})

	var store = redux.createStore(reducer, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
}