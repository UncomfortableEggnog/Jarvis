// ### Utils
// All of the fs utils, wrapped and easily exported

var fs = require('fs');

// converts obj to string, writes synchronosly to filePath
module.exports.write = function (filePath, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  fs.writeFileSync(filePath, data);
};
// reads from file, parses the string as json
module.exports.read = function (filePath, cb) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};

// Writes to local storage
module.exports.save = function (name, obj) {
  localStorage.setItem(name, obj);
};

// retrieves from localStorage
module.exports.get = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

// converts all props in an object to lower case
module.exports.lowerCaseProps = function (obj) {
  var newObj = {};
  for (var key in obj) {
    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
};

// Wrapper for commands
module.exports.saveCommands = function (obj) {
  if (typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  module.exports.save('Commands', obj);
};

// returns commands
module.exports.getCommands = function () {
  return module.exports.get('Commands');
};
