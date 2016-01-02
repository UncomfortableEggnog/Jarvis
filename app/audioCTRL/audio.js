// retrieves cwd from localstorage
var rootPath = localStorage.getItem('appPath');
// paths for the audio files.
module.exports = {
  startCmd: new Audio(rootPath + '/app/assets/audio/startCmd.wav'),
  failedCmd: new Audio(rootPath + '/app/assets/audio/failedCmd.wav')
};
