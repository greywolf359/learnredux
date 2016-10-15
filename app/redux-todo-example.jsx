var redux = require('redux');

var stateDefault = {searchText: "", showCompleted: false, todos: []}
var reducer = (state = stateDefault, action)=>{
	//state = state || {state: 'anon'}

	switch(action.type){
		case "CHANGE_SEARCH_TEXT":
		return {
			...state,
			searchText: action.searchText
		}
		default:
			return state;
	}
}
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log("searchState", currentState);

store.dispatch({
	type: "CHANGE_SEARCH_TEXT",
	searchText: "text"
});

console.log("searchText should be text", store.getState());

