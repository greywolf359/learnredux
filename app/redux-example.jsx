//var redux = require('redux');
import redux from 'redux';

console.log("Starting redux example");




var reducer = (state = {state: "anon"}, action)=>{
	//state = state || {state: 'anon'}
	return state;
}
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log("currentState", currentState)