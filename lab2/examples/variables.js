// hoisting
// console.log(a); //throws error
let a = 5;

console.log(b); //logs undefined
var b = 6;

// variables are not typed
let testVar = 5;
console.log(typeof testVar);
testVar = '5';
console.log(typeof testVar);

let testNum = 5;

// ternary operator + strict equality
const isStrictlyEqual = testVar === testNum ? true : false;
console.log('are variables strictly equal?', isStrictlyEqual);
const isNotStrictlyEqual = testVar == testNum ? true : false;
console.log('are variables strictly equal?', isNotStrictlyEqual);