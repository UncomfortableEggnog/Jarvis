var fs = require('fs');
var natural = require('natural');
var formatVariable = require('./formatVariable');
var testCommands = require('./testers/testCommands');
var getMatchByScore = require('./testers/getMatchByScore');
var phoneticsTest = require('./testers/phoneticsTest');
var JWDTest = require('./testers/JWDTest');
var findCommand = require('../utils/phraseTrie').findCommand;
var utils = require('../utils/utils');



module.exports = function (actionPrefix, variable, commandsObj) {
  var _actionPrefix = actionPrefix.toLowerCase();
  var actionObj = {};
  actionObj.exact = false;
  actionObj.userCommand = actionPrefix;
  actionObj.guessedCommand = null;
  actionObj.action = '';
  //  Mocking localStorage when in test env.
  if (process.env.NODE_ENV !== 'test') {
    var exactMatchThreshold = parseFloat(utils.get('exactMatchThreshold'));
    var closeMatchThreshold = parseFloat(utils.get('closeMatchThreshold'));
  } else {
    var exactMatchThreshold = 0.8;
    var closeMatchThreshold = 0.5;
  }

  //  Destructuring the commandsObj
  var phrases = commandsObj.phrases;
  var actions = commandsObj.rawCommands;
  var argCommands = commandsObj.parsedCommands.argCommands;
  var exactCommands = commandsObj.parsedCommands.exactCommands;
  var testPhrase = testCommands(actions, _actionPrefix);

  if (actions[_actionPrefix] !== undefined || actions[testPhrase]) {
    actionObj.exact = true;
    if (variable && argCommands[_actionPrefix]) {
      actionObj.action = formatVariable(_actionPrefix, argCommands[_actionPrefix], variable, commandsObj);
    } else {
      actionObj.action = exactCommands[_actionPrefix];
    }
    return actionObj;
  }

  //
  // findCommand
  //
  // looks in the phrases trie for a known match that jarvis had previously added
  // for instance, if we tell Jarvis to match 'Gaucho protip' to 'Kyle Cho Pro Tip'
  // when we invoke findCommand with the phrase trie and 'Gaucho protip' it will
  // return 'Kyle Cho Pro Tip'
  //
  // @param {object} phrases -  Phrases trie
  // @param {string} _actionPrefix -  user supplied term
  // @return {string} - if in phrase trie, return string
  //
  var addedPhraseTest = findCommand(phrases, _actionPrefix);

  if (addedPhraseTest) {
    actionObj.exact = true;

    if (variable && argCommands[addedPhraseTest]) {
      actionObj.action = formatVariable(argCommands[addedPhraseTest], variable, commandsObj);
    } else {
      actionObj.action = exactCommands[addedPhraseTest];
    }

  } else {
    //
    // getMatchByScore
    //
    //   Will pass in an array of commands and a user supplied term
    //   and will return out string with the highest chance of being the correct match
    //
    //   @param {array} commands -  array of known commands
    //   @param {string} _actionPrefix -  user supplied command
    //   @return {string} - command with the highest match score
    //
    console.log(closeMatchThreshold);
    var key = getMatchByScore(Object.keys(actions), _actionPrefix, closeMatchThreshold);
    if (key !== '') {
      actionObj.exact = false;
      actionObj.guessedCommand = key;
      if (variable && argCommands[key]) {
        actionObj.action = formatVariable(argCommands[key], variable, commandsObj);
      } else {
        actionObj.action = exactCommands[key];
      }
    }

  }

  return actionObj;
};
