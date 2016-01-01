// /**
//  * parseCommands takes in one object of rawCommand's (key) and bash commands (value), and
//  * returns an object with an exact command object and an object that holds commands
//  * with parsed arguments and options.
//  * ===========
//  *  Example functionality
//  *  input:
//  *   {
//  *    "check the": "open https//www.google.com/?gws_rd=ssl#q=<ARG del='+'>",               //single argument command
//  *    "open": "open <ARG del='\\ ' capitalize=true chain=true chainkey='and also'/>.app",  //single argument command with chaining
//  *    "kyle cho pro tip": "say kyle cho pro tip"                                           //exact command
//  *   }
//  *  output:
//  *   {
//  *    "exactCommands":
//  *     {
//  *       "kyle cho pro tip": "say kyle cho pro tip"
//  *     },
//  *
//  *    "argCommands":
//  *     {
//  *      "check the": {
//  *        "commands": ["open https//www.google.com/?gws_rd=ssl#q="],
//  *        "args": [{
//  *          "del": "+"
//  *        }]
//  *      },
//  *      "open": {
//  *        "commands": ["open ", ".app"],
//  *        "args": [{
//  *          "del": "\\ ",
//  *          "capitalize": true
//  *        }]
//  *      }
//  *     }
//  *
//  *  For argCommands, the hardcoded bash strings are listed as an array
//  *  under the "commands" property.  Upon execution, arguments in the
//  *  args array are injected in between each string (bash commands will
//  *  always start with the hardcoded string, never an argument).
//  *
//  */
var _argSyntax = /<ARG\s*[a-zA-Z0-9+='"_\s\\\/%]*\/>/g;
var _delSyntax = /del="\s*([^\n\r"]*)"\s* | del='\s*([^\n\r']*)'\s*/;
var _htmlSyntax = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;

var buildArgParams = function (argStr) {
  var argPhraseStr = argStr.slice(4, -2).trim();
  var argPhrases = argPhraseStr.match(_htmlSyntax);


  var argParams = {};
  argPhrases.forEach(function (phrase) {
  //Split the phrase into key/value pairs
    var arg = phrase.split("=");
    var key = arg[0];
    var value;
  //if value is wrapped in single quotation marks, remove extraneous quotes.
  //may not need this detailed of a test if input is exactly JSON format.
    if (arg[1].length > 1 && arg[1][0] === '\'' && arg[1][arg[1].length - 1] === '\'') {
      value = arg[1].slice(1, -1);
  //assign key/value to argument.
      argParams[key] = value;
    } else {
      argParams[key] = JSON.parse(arg[1]);
    }
  });
  return argParams;
};


module.exports = {
  parseCommands: function (commandObj) {
    var exactCommands = {};
    var argCommands = {};

    for (var rawCommand in commandObj) {
      var bash = commandObj[rawCommand];
      var args = bash.match(_argSyntax);
      rawCommand = rawCommand.toLowerCase();
      //arguments case: add to argCommands object
      if (args) {
        var argArr = [];
        args.forEach(function (argStr) {
          var a = buildArgParams(argStr);
          argArr.push(a);
        });

        var bashStrs = bash.split(_argSyntax).filter(function (el) {
          return el !== "";
        });

        argCommands[rawCommand] = {};
        argCommands[rawCommand]["commands"] = bashStrs;
        argCommands[rawCommand]["args"] = argArr;

      } else {
        exactCommands[rawCommand] = bash;
      }
    }
    return {
      exactCommands: exactCommands,
      argCommands: argCommands
    };
  }
};
