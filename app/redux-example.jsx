var redux = require('redux');


console.log("Starting redux example");

var reducer = (state = {name: "anon"}, action)=>{
	//state = state || {state: 'anon'}
	//console.log("new action", action);
	switch(action.type){
		case 'CHANGE_NAME':
			return{...state,
				name: action.name
			};
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
	console.log("name is ", state.name);

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
	type: 'CHANGE_NAME',
	name: "jane"
});

store.dispatch({
	type: 'CHANGE_NAME',
	name: "george"
});

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