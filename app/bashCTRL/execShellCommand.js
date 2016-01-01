var exec = require('child_process').exec;

module.exports = function (shellCommand, cb) {
  exec(shellCommand, function (error, stdout, stderr) {
    if (error) {
      if (cb) {
        cb(error);
      }
    }
    if (cb) {
      cb(null);
    }
  });
};
