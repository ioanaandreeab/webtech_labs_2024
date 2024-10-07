const sweets = [
    {
        name: 'Tiramisu',
        prepTime: 100
    },
    {
        name: 'Velvet Cake',
        prepTime: 80
    },
    {
        name: 'Muffins',
        prepTime: 60
    }
];

const mappedSweets = sweets.map(sweet => sweet.prepTime > 80 ? {...sweet, isExpert: true} : sweet);
console.log(mappedSweets);