/**
 completează corpul funcției astfel încât să cenzurezi cuvintele din lista censoredWords care apar în 
 string-ul phrase
 exemplu: javascript is w*******l
 */

 const censorFunc = (phrase, censoredWords) => {
    const phraseWords = phrase.split(" ");

    return phraseWords.map((phraseWord) => {
        if (censoredWords.includes(phraseWord)) {
            return phraseWord[0] + '*'.repeat(phraseWord.length - 2) + phraseWord[phraseWord.length - 1];
        }
        return phraseWord;
    }).join(" ");
};

console.log(censorFunc('javascript is wonderful', ['wonderful']));