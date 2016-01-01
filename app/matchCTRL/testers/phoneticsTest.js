var Metaphone = require('natural').Metaphone;
var JWDTest = require('./JWDTest');
module.exports = function (actionPrefix, key) {
  return parseFloat(JWDTest(Metaphone.process(key), Metaphone.process(actionPrefix)));
};
