/**
 * @param {string} text
 * @return {string}
 */
var reorderSpaces = function(text) {
  var n = text.length;
  var wordList = []
  var spaceCount = 0
  var currWord = ''
  for (var i = 0; i < n; i++) {
    if (text[i] === ' ') {
      spaceCount++
      if (currWord) {
        wordList.push(currWord)
        currWord = ''
      }
    } else {
      currWord += text[i]
    }
  }
  if (currWord) {
    wordList.push(currWord)
    currWord = ''
  }

  if (wordList.length === 1) {
    return wordList[0] + new Array(spaceCount).fill(' ').join('')
  }

  var c = Math.floor(spaceCount / (wordList.length - 1))
  var r = spaceCount % (wordList.length - 1)
  return wordList.reduce((prev, curr) => prev + new Array(c).fill(' ').join('') + curr) + new Array(r).fill(' ').join('')
};


reorderSpaces("  this   is  a sentence ")