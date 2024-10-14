const objectsToSort = [
    {
        name: 'John',
        hasVisa: true,
        yearOfBirth: 1990
    },
    {
        name: 'Joe',
        hasVisa: false,
        yearOfBirth: 2007
    },
    {
        name: 'Alex',
        hasVisa: false,
        yearOfBirth: 1987
    },
    {
        name: 'Alex',
        hasVisa: true,
        yearOfBirth: 1960
    }
]


const sortField = 'yearOfBirth';

// const sortByField = o funcție care să sorteze crescător array-ul după câmpul indicat de variabila sortingField
console.log(sortByField(objectsToSort, sortField));