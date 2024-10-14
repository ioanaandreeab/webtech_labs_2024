const objectsToFilter = [
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
];

const filterObject = {
    hasVisa: true,
    name: 'Alex'
};

const filterArray = (array, filterObj) => {
    return array.filter(element => {
        let meetsFilterCriteria = false;
        for (const filterCondition of Object.keys(filterObj)) {
            if (!element[filterCondition] || element[filterCondition] !== filterObj[filterCondition]) {
                meetsFilterCriteria = true;
                break;
            }
        }
        return meetsFilterCriteria;
    });
};

console.log(filterArray(objectsToFilter, filterObject));