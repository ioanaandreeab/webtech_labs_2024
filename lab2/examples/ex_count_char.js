// 'web development' -> count how many 'e's there are
function countCharacters(phrase, character) {
    let count = 0;
    for (let i=0;i<phrase.length;i++) {
      if(phrase.charAt(i) === character) {
        count++;
      }
    }
    return count;
  }
  
  console.log(countCharacters('web development','e'))