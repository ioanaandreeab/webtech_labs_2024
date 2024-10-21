// completează corpul funcției astfel încât să obții un string rezultat din 
// adăugarea token-urilor primite ca parametru în cadrul string-ului primit ca parametru
// in funcție de poziție

const formatString = (string, ...tokens) => {
    // regex testing
    return string.replace(/{(\d+)}/g, (match, index) => {
      const tokenIndex = parseInt(index, 10);
      return tokens[tokenIndex] !== undefined ? tokens[tokenIndex] : match;
    });
};
  
console.log(formatString('this is a {0} string and we\'ve {1} it', 'nice', 'modified'));
  