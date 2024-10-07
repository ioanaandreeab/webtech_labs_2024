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

const filteredSweets = sweets.filter(sweet => sweet.prepTime > 60);
console.log(filteredSweets);