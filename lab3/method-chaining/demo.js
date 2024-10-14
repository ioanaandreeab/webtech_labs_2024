const sampleText ='mathematically enhanced hamsters'

const getFirstLetters = (text) => {
    return text.split(' ').map(e => e[0]).join('');
}

console.log(getFirstLetters(sampleText));