var startCmd = require('../audioCTRL/audio').startCmd;
var failedCmd = require('../audioCTRL/audio').failedCmd;
var phoneticsTest = require('../matchCTRL/testers/phoneticsTest');
var regMatch = require('../matchCTRL/regMatch');
var ipcRenderer = require('electron').ipcRenderer;
var configUtils = require('../configCTRL/configUtils');

module.exports = function (event) {
  var name = localStorage.getItem('name');
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    var word = event.results[i][0].transcript;
    if (phoneticsTest(word, name) > 0.8) {
      this.switchListener.hasTimeout = true;
      startCmd.play();
      this.switch();
    }
  }
};
