const phrase = 'I like to go to the seaside';

const wordsFreq = (input) => {
  const wordsArr = input.split(" ");
  const result = {};
  for(word of wordsArr) {
    if(word in result) {
      result[word]++;
    } else {
      result[word] = 1;
    }
  }
  return result;
}

console.log(wordsFreq(phrase));