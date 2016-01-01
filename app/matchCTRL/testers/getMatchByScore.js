var phoneticsTest = require('./phoneticsTest');


// getMatchByScore - reduces over an array of commands, and
// keeps the highest scoring phrase
//
// @param {array} phrases - array of known commands
// @param {string} actionPrefix - user supplied command
// @return {string}
//


module.exports = function (phrases, actionPrefix, closeMatchThreshold) {
  var match = phrases.reduce(function (max, phrase) {
    if (max.score === undefined) {
      max.phrase = phrase;
      max.score = phoneticsTest(phrase, actionPrefix);
      return max;
    } else {
      var score = phoneticsTest(phrase, actionPrefix);
      return max.score > score ? max : {
        phrase: phrase,
        score: score
      };
    }
  }, {});
  return match.score > closeMatchThreshold ? match.phrase : '';
};
