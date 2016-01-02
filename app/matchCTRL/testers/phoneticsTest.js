// converts the two words into it's metaphones
// then we run a JaroWinklerDistance function on it to get the string distance
var Metaphone = require('natural').Metaphone;
var JWDTest = require('./JWDTest');
module.exports = function (actionPrefix, key) {
  return parseFloat(JWDTest(Metaphone.process(key), Metaphone.process(actionPrefix)));
};
