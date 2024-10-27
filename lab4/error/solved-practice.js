const giveRaises = (currentSalaries, raise) => {
    /* funcția primește un array de salarii și acordă măriri procentuale fiecăruia
    trebuie să arunce o excepție dacă 
        - primul parametru nu este un array
        - al doilea parametru nu este un număr mai mare decât zero
        - dacă oricare dintre salariile primite ca parametru este mai mic sau egal cu zero
    să se logheze salariile după ce măririle sunt aplicate
    */
    if (typeof raise !== 'number' || raise < 0) {
        throw new Error('Raise should be a postive number');
    }

    if(!Array.isArray(currentSalaries) || !currentSalaries.every(elem => typeof elem === "number")) {
        throw new Error('Current salaries should be an array of numbers');
    }
    
    console.log('salaries after raise', currentSalaries.map(salary => salary + salary * raise/100));
}

try {
    giveRaises([500, 1000, 750], 10) // should pass
    giveRaises(75, 10) // should throw error
    giveRaises([500, 1000, 'coffee'], 10) // should throw error
    giveRaises([500, 1000, 750], 'a small loan of a million dollars') // should throw error
} catch (error) {
    console.warn(error)
}