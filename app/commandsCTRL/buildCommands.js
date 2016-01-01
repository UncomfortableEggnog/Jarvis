//
// buildCommands
//
// reads the packages from file then passes package to updateCommands
// where properties are added to commandsObj
//
// @param {string} variable -  description
// @return {string}
//


var updateCommandObj = require('./updateCommands');
var read = require('../utils/utils').read;
module.exports = function (commandPath, callback) {
  read(commandPath, function (err, packageObj) {
    if (err) {
      // if err, or path not found, pass empty object
      var commandObj = updateCommandObj({});
    } else {
      var commandObj = updateCommandObj(packageObj);
    }
    commandObj.commandPath = commandPath;
    commandObj.phrasesPath = commandPath.replace('.json', '-phrases.json');
    callback(null, commandObj);
  });
};
