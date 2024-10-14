const words = ["Hello", ", ", "world", "!"];

const combinedString = words.reduce((accumulator, currentValue) => accumulator + currentValue, "");
console.log(combinedString);