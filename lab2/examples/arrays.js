const myArray = [1, 2, 3, 4];

console.log(myArray.length, ' - the length of the array');
console.log(myArray.pop(), ' - the last elem of the array');

myArray.push(6);
console.log(myArray)

for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
}

myArray.forEach(elem => console.log(elem));