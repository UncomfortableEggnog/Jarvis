// ## regMatch
//
// Takes an array of terms and checks to see if it matches regardless of case

var _ = require('underscore');
module.exports = function (arr, term) {
  var regTerm = new RegExp(term, 'i');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].match(regTerm)) {
      return true;
    }
  }
  return false;
};
