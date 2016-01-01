'use strict';
var matching = require('./matchingUtil');
var prefixTrie = require('./prefixTrie');

module.exports.matchUtil = function (userCommand, commandsObj) {
//
// prefixTrie.build
// builds a prefix trie with the commands specified to have arguments
//
// @param {string} term -  user supplied term that has both command and argument
// @return {array} - returns an array of length two, first item is the prefix,
//                   second item is the argument
//
  prefixTrie.build(Object.keys(commandsObj.parsedCommands.argCommands));
  var prefixArray = prefixTrie.findPrefix(userCommand.term);

  // checks to see if user supplied term that takes an argument
  if (prefixArray[0] !== null) {
    var actionPrefix = prefixArray[0];
    var variable = prefixArray[1].trim();
  } else {
    var actionPrefix = prefixArray[1];
    var variable = null;
  }

  return matching(actionPrefix.trim(), variable, commandsObj);
};
