// Takes an existing commandObj or builds a new one
// takes the package, and extends it.
var _ = require('underscore');
var lowerCaseProps = require('../utils/utils').lowerCaseProps;
var parseCommands = require('../matchCTRL/parseCommands').parseCommands;
var coreUtils = require('../packages/core-utils');

module.exports = function (packageObj, commandObj) {
  // Init commandObj
  commandObj = commandObj || {};
  // turn current package's props to lower case
  commandObj.packageCommands = lowerCaseProps(packageObj);
  commandObj.rawCommands = _.extend(coreUtils, packageObj);
  commandObj.parsedCommands = parseCommands(commandObj.rawCommands);
  return commandObj;
};
