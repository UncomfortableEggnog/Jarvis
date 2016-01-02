// extends the native HTML5 speechRecognition obj
var startCmd = require('../audioCTRL/audio').startCmd;
var failedCmd = require('../audioCTRL/audio').failedCmd;
var ipcRenderer = require('electron').ipcRenderer;

module.exports = function (cb, name, timeout) {

  var listener = new webkitSpeechRecognition();
  // if a timeout has been speficied, the listener will shut down and switch
  // at that time. Otherwise it will loop continiously.
  listener.hasTimeout = timeout ? true : false;
  listener.name = name;
  var on;

  // if listener is 'on', this will kick the listener back on when it ends
  listener.onend = function (event) {
    if (on) {
      this.start();
    }
  };
  // When the listener gets a result, it will invoke this callback function
  listener.onresult = cb;

  // This will turn the listner 'off'
  // 'on' needs to be false otherwise the listener will kick back on
  listener.pause = function () {
    on = false;
    this.stop();
  };

  // when .switch() is called, the listener will turn off and kick up
  // the spefified switchListener
  listener.switchListener;
  listener.link = function (otherListener) {
    listener.switchListener = otherListener;
  };

  // if a timeout has been spefified, we invoke this setTimeout function
  // which will kill the listener and switch to it's switchListener
  listener.selfDestruct = function () {
    this.timer = window.setTimeout(function () {
      failedCmd.play();
      this.switch();
    }.bind(this), timeout);
  };

  // this method kills the timeout function
  listener.killTimer = function () {
    window.clearTimeout(this.timer);
  };

  // on start, we turn the listener 'on' and kick off selfDestruct if timeout is
  // speficied
  listener.onstart = function (e) {
    console.log(this.name, ' is listening');
    if (listener.hasTimeout) {
      this.selfDestruct();
      listener.hasTimeout = false;
    }
    on = true;
  };

  // stops current listener and kicks up the 'switchListener'
  listener.switch = function () {
    on = false;
    listener.abort();
    console.log(this.name, ' is stopping');
    listener.switchListener.start();
  };

  return listener;
};
