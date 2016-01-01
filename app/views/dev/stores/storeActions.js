import { updateCommands, loadPackage } from '../../../commandsCTRL/commandsCTRL';
import { writeConfig } from '../../../configCTRL/configUtils';
import Constants from '../constants/constants';
import { getCommands } from '../../../utils/utils';
import _ from 'underscore';

export function _getCommands() {
  return getCommands().packageCommands;
}

  // _liveUpdateCommand live updates the command - if you make changes in the view
  // _liveUpdateCommand will update the _commands array in the store.
  //
  // it takes an object which tells the store what changes are being made:
  // index - the index of the command being edited
  // change - is the change being made
  // type - command or action field
  //
  // we then find the index of the command being edited in _commands and
  // changes the object live.

export function _liveUpdateCommand(_commands, command) {
  const { index, change, type } = command;
  const oldCommand = Object.keys(_commands[index])[0];
  if (type === Constants.ACTION) {
    _commands[index][oldCommand] = change;
  } else if (type === Constants.COMMAND) {
    const action = _commands[index][oldCommand];
    _commands[index] = {
      [change]: action };
  }
  return _commands;
}

// takes the commands object from commandsUtil and converts it to an array

export function _reloadCommands(commandsObj) {
  const results = Object.keys(commandsObj)
    .reduce((arr, cmd) => {
      return arr.concat({
        [cmd]: commandsObj[cmd] });
    }, []);
  return results;
}

// _saveCommands takes the _commands array from the store and
// reduces it back into one commandsObj. It is then shipped off
// to updateCommands in the commandsUtils where the updated commands
// are merged into the commandsObj, saved and written

export function _saveCommands(commands, cb) {
  const packageCommands = commands.reduce((cmdObj, cmd) => {
    if (Object.keys(cmd) === '') {
      return cmdObj;
    }
    return Object.assign(cmdObj, cmd);
  }, {});
  updateCommands(packageCommands, (err, cmd) => {
    cb(null, _reloadCommands(cmd));
  });
}

// adds an empty object into a field, then saves
// the changes in the commandsUtil
export function _addCommand(commands, cb) {
  commands.push({
    'command': 'action' });
  _saveCommands(commands, (err, cmd) => {
    cb(null, cmd);
  });
}

export function _loadPackage(filePath, cb) {
  writeConfig({
    commandsPath: filePath,
    phrasesPath: filePath.replace('commands.', 'phrases.') }, (err, data) => {
    loadPackage(data, cb);
  });
}

export function _saveConfig(config, cb) {
  writeConfig(config, (err, data) => {
    cb(err, data);
  });
}

export function _getConfig() {
  const name = localStorage.getItem('name');
  const exactMatchThreshold = parseFloat(localStorage.getItem('exactMatchThreshold'));
  const closeMatchThreshold = parseFloat(localStorage.getItem('closeMatchThreshold'));
  return {
    name,
    exactMatchThreshold,
    closeMatchThreshold };
}


export function _deleteCommand(command, cb) {
  _saveCommands(command, cb);
}

export function _updateConfig(oldConfig, newConfig) {
  return _.extend(oldConfig, newConfig);
}
