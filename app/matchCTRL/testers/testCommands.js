// passes commands into forloop and matches each command regardless of case
var regMatch = require('../regMatch');
module.exports = function (commands, _actionPrefix) {
  for (var command in commands) {
    if (regMatch(command, _actionPrefix)) {
      return command;
    };
  }
  return null;
};
