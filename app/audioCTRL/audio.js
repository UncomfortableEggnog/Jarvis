var rootPath = localStorage.getItem('appPath');
module.exports = {
  startCmd: new Audio(rootPath + '/app/assets/audio/startCmd.wav'),
  failedCmd: new Audio(rootPath + '/app/assets/audio/failedCmd.wav')
};
