var expect = require('chai').expect;
var PhraseTrie = require('../app/utils/phraseTrie').PhraseTrie;
var addPhrase = require('../app/utils/phraseTrie').addPhrase;
var findCommand = require('../app/utils/phraseTrie').findCommand;
var fs = require('fs');
var _ = require('underscore');
var coreUtils = require('../app/packages/core-utils');
coreUtils = _.extend(coreUtils, {
  "apple": "aple",
  "apples": "apels",
  "apps": "apppppp",
  "apd": "sad"
});

describe('Phrase trie', function (done) {
  var phraseTrie;
  before(function (done) {
    phraseTrie = PhraseTrie();
    for (var command in coreUtils) {
      addPhrase(phraseTrie, command, command);
    }
    done();
  });
  it('should fetch known commands', function (done) {
    for (var command in coreUtils) {
      var result = findCommand(phraseTrie, command);
      expect(result).to.equal(command);
    }
    done();
  });
  it('should add phrases', function (done) {
    var closeMatches = ['kykprodfsasdaf', 'koko padsfrodfas ol'];
    var command = 'kyle cho pro tip';
    for (var i = 0; i < closeMatches.length; i++) {
      addPhrase(phraseTrie, closeMatches[i], command);
    }
    var result = findCommand(phraseTrie, 'koko padsfrodfas ol');
    expect(result).to.equal('kyle cho pro tip');
    done();
  });
  it('should find phrases that have multiple commands on its phrasesPath', function (done) {
    addPhrase(phraseTrie, 'applette', 'not apple');
    var result = findCommand(phraseTrie, 'applette');
    expect(result).to.equal('not apple');
    done();
  });

  it('should let you change commands already put in there', function (done) {
    addPhrase(phraseTrie, 'bob', 'billy');
    addPhrase(phraseTrie, 'bob', 'tang');
    var result = findCommand(phraseTrie, 'bob');
    expect(result).to.equal('tang');
    done();
  });
});
