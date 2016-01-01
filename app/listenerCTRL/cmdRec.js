var commandsUtil = require('../commandsCTRL/commandsCTRL');
var getCommands = require('../utils/utils').getCommands;
var executeShellCommand = require('../bashCTRL/execShellCommand');
var startCmd = require('../audioCTRL/audio').startCmd;
var failedCmd = require('../audioCTRL/audio').failedCmd;
var match = require('../matchCTRL/matchCtrl').matchUtil;
var listener = require('./listener');
var phoneticsTest = require('../matchCTRL/testers/phoneticsTest');
var matchObj;

module.exports = function (event) {
  this.killTimer();
  this.pause();
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  var userCommand = {
    score: confidence,
    term: transcript
  };
  console.log('inside cmdRec with ', transcript);
  matchObj = match(userCommand, getCommands());

  // If there is an action and no guessedCommand, that means we have an exact match
  if (matchObj.action && !matchObj.guessedCommand) {
    startCmd.play();
    executeShellCommand(matchObj.action, function (err) {
      this.switch();
    }.bind(this));

  } else if (matchObj.guessedCommand) {
    console.log('guessing ', matchObj.guessedCommand);
    //
    //   passed executeShellCommand a CB because the function is async, and
    //   confirm listener was recording the last few words of 'did you mean?'
    //
    executeShellCommand("say did you mean" + matchObj.guessedCommand + "?", function () {
    //
    //   By keeping this function within this scope,
    //   it retains access to the commandsUtils object,
    //   the matchObj and the executeShellCommand function.
    //
    //   we can switch the current context by binding the callback
    //   to the current context
    //
      var confirmListener = listener(function (event) {
        confirmListener.pause();
        confirmListener.killTimer();
        var word = event.results[0][0].transcript;
        if (phoneticsTest(word, 'Yes') > 0.6) {
          commandsUtil.addPhrase(
            matchObj.guessedCommand,
            matchObj.userCommand,
            function () {
              startCmd.play();
              executeShellCommand(matchObj.action, function () {
                confirmListener.switch();
              });
          }.bind(this));
        } else {
          console.log(this.name, ' just failed to match');
          failedCmd.play();
          this.switch();
        }
      }.bind(this), 'confirm', 5000);
      confirmListener.link(this.switchListener);
      confirmListener.start();
    }.bind(this));
  } else {
    failedCmd.play();
    this.switch();
  }
};
