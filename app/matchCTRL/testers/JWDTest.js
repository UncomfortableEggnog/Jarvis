// compares two strings and scores it based on string distance
var JaroWinklerDistance = require('natural').JaroWinklerDistance;
module.exports = function (key, _actionPrefix) {
  return JaroWinklerDistance(key, _actionPrefix);
};
