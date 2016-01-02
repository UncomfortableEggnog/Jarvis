// Initial load for the listener
// we initialize the prefix/command listeners
// When electron is done loading the page, we build the commandsObj from
// the config file, then kick off the prefixListener

var ipcRenderer = require('electron').ipcRenderer;
var listener = require('./listenerCTRL/listener');
var prefixRec = require('./listenerCTRL/prefixRec');
var cmdRec = require('./listenerCTRL/cmdRec');


if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {

  var prefixRecognition = listener(prefixRec, 'prefix');
  prefixRecognition.interimResults = true;

  // force restart on audioend - otherwise Jarvis hangs
  prefixRecognition.onaudioend = function () {
    this.stop();
  };

  var commandRecognition = listener(cmdRec, 'cmd', 5000);

  prefixRecognition.link(commandRecognition);
  commandRecognition.link(prefixRecognition);
}

ipcRenderer.on('listening', function (event) {
  // clear localStorage
  localStorage.clear();
  // retrieve cwd from electron and set that to our current Path
  localStorage.setItem('appPath', ipcRenderer.sendSync('getPath'));
  var commandsUtil = require('./commandsCTRL/commandsCTRL');
  var configUtils = require('./configCTRL/configUtils');
  // retrieves config.json
  configUtils.getConfig(function (err, data) {
    if (err) {
      console.log(err);
    }
    var config = JSON.parse(data);
    // if no commandsPath has been specified, write to file
    // NOTE: if errors happen, just make new config.json
    if (config.commandsPath === '') {
      config.commandsPath = localStorage.getItem('appPath') + '/app/packages/commands.json';
      config.phrasesPath = localStorage.getItem('appPath') + '/app/packages/phrases.json';
    }
    // save config to localStorage
    configUtils.saveConfig(config);
    // loadPackage into jarvis
    commandsUtil.loadPackage(config, function (err, data) {
      prefixRecognition.start();
      configUtils.writeConfigSync(config);
    });
  });
});
