var fs = require('fs');
var saveCommands = require('../utils/utils').saveCommands;
var getCommands = require('../utils/utils').getCommands;


//
// saveAndWrite
//
// First write commandsObj to localStorage, then persist it by writing to json
//
// @param {object} commandsObj - parsedCommands, phrases, rawCommands, paths
// @param {function} cb - callback
//

module.exports = function (commandsObj, cb) {
  saveCommands(commandsObj);
  fs.writeFile(
    commandsObj.commandPath,
    JSON.stringify(commandsObj.packageCommands),
    'utf8',
    function (err, data) {
      if (err) {
        cb(err);
      } else {
        fs.writeFile(
          commandsObj.phrasesPath,
          JSON.stringify(commandsObj.phrases),
          'utf8',
          function (err, data) {
            cb(null, getCommands());
        });
      }
    });
};
