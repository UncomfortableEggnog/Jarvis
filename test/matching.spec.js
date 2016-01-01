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
  "closeMatchThreshold": "0.5",
  "name": "Jarvis" };
var fs = require('fs');
var expect = require('chai').expect;
var matching = require('../app/matchCTRL/matchingUtil');
var testCommands = require('../app/matchCTRL/testers/testCommands');
var JWDTest = require('../app/matchCTRL/testers/JWDTest');
var phoneticsTest = require('../app/matchCTRL/testers/phoneticsTest');
var getMatchByScore = require('../app/matchCTRL/testers/getMatchByScore');
var commandsUtil = require('../app/commandsCTRL/commandsCTRL');
var utils = require('../app/utils/utils');
var testCases = require('./tmp/matching-test-cases');


describe('Matching', function (done) {
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
  it('should match exact commands', function (done) {
    var obj = matching('google', 'hello', commandsObj);
    expect(obj).to.be.an('object');
    done();
  });
  it('should match phonetics', function (done) {
    for (var phrase in testCases) {
      for (var i = 0; i < testCases[phrase].length; i++) {
        var userInput = testCases[phrase][i].term;
        var guess = getMatchByScore(Object.keys(testCases), userInput, 0.65);
        console.log('expecting ', userInput, ' to match ', phrase);
        expect(guess).to.equal(phrase);
      }
    }
    done();
  });
});
