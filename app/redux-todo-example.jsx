var redux = require('redux');

var stateDefault = {searchText: "", showCompleted: false, todos: []}
var reducer = (state = stateDefault, action)=>{
	//state = state || {state: 'anon'}
	return state;
}
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log("searchState", currentState);

function tester(obj){
	return {...obj, dude: "tester"};
}

var xxx = tester({name: "me"});

console.log(xxx);