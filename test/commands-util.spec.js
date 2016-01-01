var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var del = require('del');
var _ = require('underscore');
/*
  mock localStorage
*/
GLOBAL.localStorage = {
  storage: {},
  getItem: function (key) {
    return this.storage[key];
  },
  setItem: function (key, item) {
    if (typeof item !== 'string') {
      item = JSON.stringify(item);
    }
    this.storage[key] = item;
  },
  clear: function () {
    this.storage = {};
  }
};
/*
  mock data
*/
localStorage.setItem('appPath', __dirname);
var config = {
  "phrasesPath": __dirname + '/tmp/phrases.json',
  "commandsPath": __dirname + '/tmp/commands.json',
  "exactMatchThreshold": "0.8",
  "closeMatchThreshold": "0.66",
  "name": "Jarvis" };
var extraCommands = {
  "wut wut": "osascript -e 'tell application \"System Events\"" +
  "to repeat 2 times' -e 'key code 24 using {command down}'" +
  " -e 'delay 0.1' -e 'end repeat'",
  "woot woot": "osascript -e 'tell application \"System Events\"" +
  " to repeat 2 times' -e 'key code 27 using {command down}'" +
  " -e 'delay 0.1' -e 'end repeat'" };

/*
  utils
*/

var commandsUtil = require('../app/commandsCTRL/commandsCTRL');
var utils = require('../app/utils/utils');

describe('commands util', function (done) {
  var commandsObj;
  beforeEach(function (done) {
    commandsUtil.loadPackage(config, function (err, data) {
      commandsObj = data;
      done();
    });
  });
  afterEach(function (done) {
    localStorage.clear();
    done();
  });
  it('should have loaded commandsObj into local storage', function () {
    var newCommandsObj = utils.getCommands();
    expect(newCommandsObj).to.deep.equal(commandsObj);
  });
  it('should allow user to add new commands', function (done) {
    var old = utils.getCommands();
    var newPackage = _.extend(old.packageCommands, extraCommands);
    commandsUtil.updateCommands(newPackage, function (err, data) {
      expect(data).to.have.property('woot woot');
      done();
    });
  });
  it('should allow user to delete commands', function (done) {
    var old = utils.getCommands();
    delete old.packageCommands['woot woot'];
    commandsUtil.updateCommands(old.packageCommands, function (err, data) {
      expect(data).to.have.not.property('woot woot');
      done();
    });
  });
});
