// Prefix Trie
// wrapper for natural prefixTrie

var natural = require('natural');
var Trie = natural.Trie;

module.exports.build = function (strings) {
  module.exports.trie = new Trie(false);
  module.exports.trie.addStrings(strings);
};

module.exports.findPrefix = function (str) {
  return module.exports.trie.findPrefix(str);
};
