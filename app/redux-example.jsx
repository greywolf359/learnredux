import redux from "redux";

console.log("Starting redux example");


//pure function
function add(a,b){
	return a + b;
}

//impure functions
var a = 3;
function add(b){
	return a + b;
}
var result;
function add(a,b){
	result = a + b;
	return result;
}
function add(a,b){
	return a + b + new Date().getSeconds();
}

function changeProp(obj){
	return {
		//getting a syntax error here at the spread operator, unexpected token
		...obj,
		name: 'tom'
	}
}

var startingValue = {
	name: 'andrew',
	age: 25
};

var res = changeProp(startingValue);
console.log(startingValue);
console.log(res);