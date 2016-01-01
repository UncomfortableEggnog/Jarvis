var startCmd = require('../audioCTRL/audio').startCmd;
var failedCmd = require('../audioCTRL/audio').failedCmd;
var ipcRenderer = require('electron').ipcRenderer;

module.exports = function (cb, name, timeout) {

  var listener = new webkitSpeechRecognition();
  listener.hasTimeout = timeout ? true : false;
  listener.name = name;
  var on;

  listener.onend = function (event) {
    if (on) {
      this.start();
    }
  };
  listener.onresult = cb;

  listener.pause = function () {
    on = false;
    this.stop();
  };

  listener.switchListener;
  listener.link = function (otherListener) {
    listener.switchListener = otherListener;
  };

  listener.selfDestruct = function () {
    this.timer = window.setTimeout(function () {
      failedCmd.play();
      this.switch();
    }.bind(this), timeout);
  };

  listener.killTimer = function () {
    window.clearTimeout(this.timer);
  };

  listener.onstart = function (e) {
    console.log(this.name, ' is listening');
    if (listener.hasTimeout) {
      this.selfDestruct();
      listener.hasTimeout = false;
    }
    on = true;
  };

  listener.switch = function () {
    on = false;
    listener.abort();
    console.log(this.name, ' is stopping');
    listener.switchListener.start();
  };

  return listener;
};
