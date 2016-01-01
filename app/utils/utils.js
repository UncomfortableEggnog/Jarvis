var fs = require('fs');

module.exports.write = function (filePath, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  fs.writeFileSync(filePath, data);
};

module.exports.read = function (filePath, cb) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};

module.exports.save = function (name, obj) {
  localStorage.setItem(name, obj);
};

module.exports.get = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

module.exports.lowerCaseProps = function (obj) {
  var newObj = {};
  for (var key in obj) {
    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
};

module.exports.saveCommands = function (obj) {
  if (typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  module.exports.save('Commands', obj);
};

module.exports.getCommands = function () {
  return module.exports.get('Commands');
};
