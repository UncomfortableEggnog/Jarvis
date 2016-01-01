var JaroWinklerDistance = require('natural').JaroWinklerDistance;
module.exports = function (key, _actionPrefix) {
  return JaroWinklerDistance(key, _actionPrefix);
};
