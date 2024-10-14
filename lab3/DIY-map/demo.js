const myArray = [1, 2, 3, 4];

const customMap = (inputArr, transformation) => {
    const newArray = [];
    for (const elem of inputArr) {
        newArray.push(transformation(elem));
    }
    return newArray;
};

console.log(customMap(myArray, (e) => (e*5)));