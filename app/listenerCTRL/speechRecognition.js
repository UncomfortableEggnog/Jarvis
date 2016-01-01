var ipcRenderer = require('electron').ipcRenderer;
var listener = require('./listenerCTRL/listener');
var prefixRec = require('./listenerCTRL/prefixRec');
var cmdRec = require('./listenerCTRL/cmdRec');


if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var prefixRecognition = listener(prefixRec, 'prefix');
  prefixRecognition.interimResults = true;

  prefixRecognition.onaudioend = function () {
    this.stop();
  };
  var commandRecognition = listener(cmdRec, 'cmd', 5000);

  prefixRecognition.link(commandRecognition);
  commandRecognition.link(prefixRecognition);
}

ipcRenderer.on('listening', function (event) {
  localStorage.clear();
  localStorage.setItem('appPath', ipcRenderer.sendSync('getPath'));
  var commandsUtil = require('./commandsCTRL/commandsCTRL');
  var configUtils = require('./configCTRL/configUtils');
  configUtils.getConfig(function (err, data) {
    if (err) {
      console.log(err);
    }
    var config = JSON.parse(data);
    if (config.commandsPath === '') {
      config.commandsPath = localStorage.getItem('appPath') + '/app/packages/commands.json';
      config.phrasesPath = localStorage.getItem('appPath') + '/app/packages/phrases.json';
    }
    configUtils.saveConfig(config);
    commandsUtil.loadPackage(config, function (err, data) {
      prefixRecognition.start();
      configUtils.writeConfigSync(config);
    });
  });
});
