var redux = require('redux');


console.log("Starting redux example");

var reducer = (state = {state: "anon"}, action)=>{
	//state = state || {state: 'anon'}
	console.log("new action", action);
	switch(action.type){
		case 'CHANGE_NAME':
			return{...state,
				name: action.name
			};
		default:
			return state;
	}
}
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log("currentState", currentState);



store.dispatch({
	type: 'CHANGE_NAME',
	name: "tom"
});

console.log("name should be tom", store.getState());