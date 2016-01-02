// This listener is continiously listening for it's name
// once it hear's its name, it will play the startCmd wave file and
// will call switch()
var startCmd = require('../audioCTRL/audio').startCmd;
var phoneticsTest = require('../matchCTRL/testers/phoneticsTest');

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
