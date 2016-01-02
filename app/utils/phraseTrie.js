var _ = require('underscore');

// PhraseTrie returns a obj that can be persisted to a JSON.
// It stores children in an object, stores the current letter in .letter
// and if it houses a command, it sets that too.
module.exports.PhraseTrie = function (letter, command) {
  var obj = {};
  obj.letter = letter || null;
  obj.command = command || null;
  obj.children = {};
  return obj;
};

module.exports.findCommand = function (trie, sentence) {
  var letters = sentence.replace(/[^0-9a-z]/gi, '').split('');
  var command = '';
  function innerFn (trie, chars) {
    if (trie.command) {
      command = trie.command;
    }
    if (trie.children[chars[0]]) {
      innerFn(trie.children[chars[0]], chars.slice(1));
    }
  }
  innerFn(trie, letters);
  return command === '' ? null : command;
};

// loop through all of the letters in the phrase
// at the end of the phrase, set the current trie's command to the passed in command

module.exports.addPhrase = function (trie, phrase, command, letters) {
  letters = letters || phrase.replace(/[^0-9a-z]/gi, '').split('');
  var letter = letters[0];
  var nextPhrase = trie[letter] || null;

  if (letters.length === 0) {
    trie.command = command;
    return;
  } else if (!nextPhrase) {
    nextPhrase = module.exports.PhraseTrie(letter);
    trie.children[letter] = nextPhrase;
    module.exports.addPhrase(nextPhrase, phrase, command, letters.slice(1));
  } else {
    module.exports.addPhrase(nextPhrase, phrase, command, letters.slice(1));
  }

};
