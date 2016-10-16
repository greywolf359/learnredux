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
		case "CHANGE_SHOWCOMPLETED":
			return {
				...state,
				showCompleted: action.showCompleted
			}
		default:
			return state;
	}
}

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
	));

var unsubscribe = store.subscribe(()=>{
	var state = store.getState();
	console.log("search text is ", state.searchText);

	document.getElementById('element').innerHTML = state.searchText
});

var currentState = store.getState();
console.log("searchState", currentState);

//dispatching actions
store.dispatch({
	type: "CHANGE_SEARCH_TEXT",
	searchText: "text"
});

store.dispatch({
	type: "CHANGE_SEARCH_TEXT",
	searchText: "dogs are awesome"
});

store.dispatch({
	type: "CHANGE_SEARCH_TEXT",
	searchText: "it is raining"
});

store.dispatch({
	type: "CHANGE_SHOWCOMPLETED",
	showCompleted: true
});


