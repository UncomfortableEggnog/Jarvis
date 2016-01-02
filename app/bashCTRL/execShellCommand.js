var exec = require('child_process').exec;

// Takes a shell command and executes it. Invokes a callback on completion
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
