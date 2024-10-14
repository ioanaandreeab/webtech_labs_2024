const somePastaTypes = ['Carbonara', 'Bolognese', 'Pesto', 'Norma'];

const pastaTypeToFilterOut = 'Pesto';

const filteredPastaTypes = somePastaTypes.filter(e => e !== pastaTypeToFilterOut);

console.log(somePastaTypes);
console.log(filteredPastaTypes);