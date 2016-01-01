//
//  formatVariable
//  ===========
//
//  Takes an input (command) actionPrefix and variable string.
//  Looks up command in argCommands object and returns the variable
//  with the correct delimiter syntax.
//
//   EX: formatVariable('check the', 'name of US president') //=> 'name+of+US+president'
//

//test actionObj ==> need to pass this in
// var actionObj =
//   {
//     "commands": ["open ", ".app"],
//     "args": [{
//       "del": "\\ ",
//       "capitalize": true,
//       "chainSync": true,
//       "chainkey": "and also"
//       }]
//   };

// var commandsObj =
//   {
//     "rawCommands": {
      // "open": "open /Applications/<ARG del='\\ ' capitalize=true chain=true chainkey='and also'/>.app"
//     }

//   };

// var actionObj =
//   {
//     "commands": ["open ", ".app"],
//     "args": [{
//       "del": "\\ ",
//       "capitalize": true
//       }]
//   };



// var actionObj =
//   {
//     "commands": ["open https://www.google.com/maps/dir/ ", "/", "/"],
//     "args": [{
//       "del": "+",
//       "capitalize": true,
//       "chainkey": "to"
//       },
//       {
//       "del": "+",
//       "capitalize": true,
//       "chainkey": "to"
//       }]
//   };

// var commandsObj =
//   {
//     "rawCommands": {
//       "open": "open /Applications/<ARG del='\\ ' capitalize=true/>.app",
//       // "enhance": "osascript -e 'tell application \"System Events\"to repeat <ARG del='' default=2/> times' -e 'key code 24 using {command down}' -e 'delay 0.1' -e 'end repeat",
//       "directions from": "open https://www.google.com/maps/dir/<ARG del='+' chainkey='to'/>/<ARG del='+' />/"
//     }

//   };

//===test strings====
//  phrase = "check the";
//  variable = "name of US president";

//NOTE: this syntax does NOT have the global (/g) flag!!
var _argSyntax = /<ARG\s*[a-zA-Z0-9+=_'"\s\\\/%]*\/>/;

function buildArgumentSyntax (argStr, argParams) {

  //===string case====
  if (argParams['case'] === 'upper') {
    argStr = argStr.toUpperCase();
  } else if (argParams['case'] === 'lower') {
    argStr = argStr.toLowerCase();
  } else if (argParams['case'] === 'proper') {
    argStr = argStr[0].toUpperCase() + argStr.slice(1);
  }

  //===wrap quotation marks====
  if (argParams['quotes']) {
    argStr = '"' + argStr + '"';
  }

  var varArr = argStr.trim().split(' ');
  //===capitalize====
  if (argParams['capitalize']) {
    varArr = varArr.map(function (word) {
      return word[0].toUpperCase() + word.slice(1);
    });
  }

  //===delimiter====
  var del = argParams["del"];
  //add backslash to whitespace delimiters.
  if (del === " ") {
    del = "\\ ";
  }

  argStr = varArr.join(argParams['del']);
  return argStr;
}


module.exports = function (actionPrefix, actionObj, variable, commandsObj) {
  var bash = commandsObj.rawCommands[actionPrefix]; // open http://.....<args/>


  var bashStrs = actionObj["commands"];
  var args = actionObj["args"];

  var argParams = actionObj["args"][0];

  //=========Argument Parameter Handling=======
  //TODO: move argument parameter handling to separate module.


  //===chainsync case: process this first for potential extra arguments.
  //===chainsync allows for command to be executed multiple times with any number of arguments.
  var _action = '';
  if (args[0]['chainsync']) {
    var varArr = variable.split(args[0]['chainkey']);
    for (var i = 0; i < varArr.length; i++) {
      var varFragment = buildArgumentSyntax(varArr[i], args[0]);
      _action += bash.replace(_argSyntax, varFragment) + ';';
    }
    return _action;
  } else {

  //==general case (no chainsync):
    var varArr = variable.split(args);

    for (var i = 0; i < args.length; i++) {
  //EX: variable = "Berkeley to Los Angeles" => 2 args
  // _action += bashStrs[i] || "" + build;
    if (args[i]['chainkey']) {
  //get keyword to separate next argument.
      var chainkey = args[i]['chainkey'];
  //split entire string then extract first element on chain.
      var varArr = variable.split(chainkey);
      var varStr = varArr.shift();
  //reassemble remaining variable string in case split in multiple areas.
      variable = varArr.join(chainkey);
    } else {
      var varStr = variable;
    }
    var bashVariable = buildArgumentSyntax(varStr, args[i]);
    bash = bash.replace(_argSyntax, bashVariable);
      _action = bash;
    }
    return _action;
  }
};
