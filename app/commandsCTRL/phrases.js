var PhraseTrie = require('../utils/phraseTrie').PhraseTrie;
var addPhrase = require('../utils/phraseTrie').addPhrase;
var read = require('../utils/utils').read;

// if phrases doesn't exist, rebuild from rawCommands
var newPhrases = function (rawCommands) {
  var commands = Object.keys(rawCommands);
  var initTrie = PhraseTrie();
  for (var i = 0; i < commands.length; i++) {
    addPhrase(initTrie, commands[i], commands[i]);
  }
  return initTrie;
};

// if phrases exists, then it returns a new phrases obj
var initPhrases = function (commandsObj, cb) {
  read(commandsObj.phrasesPath, function (err, phrases) {
    if (err) {
      commandsObj.phrases = newPhrases(commandsObj.rawCommands);
      cb(null, commandsObj);
    } else {
      commandsObj.phrases = phrases;
      cb(null, commandsObj);
    }
  });
};

// A function that takes advantange of JS's passing objects by reference.
// Adds the commands one by one into the datastructure. Because we are editing by reference
// we can then return the original object and it will be updated.
var buildPhrases = function (phrases, commands) {
  for (var command in commands) {
    addPhrase(phrases, command, command);
  }
  return phrases;
};


module.exports = {
  initPhrases: initPhrases,
  buildPhrases: buildPhrases
};
