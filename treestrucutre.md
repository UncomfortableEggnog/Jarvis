├── Gruntfile.js
├── app
│   ├── assets
│   │   ├── audio
│   │   ├── icons
│   │   └── img
│   ├── audioCTRL
│   │   └── audio.js
│   ├── bashCTRL
│   │   └── execShellCommand.js
│   ├── commandsCTRL
│   │   ├── buildCommands.js
│   │   ├── commandsCTRL.js
│   │   ├── phrases.js
│   │   ├── saveAndWrite.js
│   │   └── updateCommands.js
│   ├── configCTRL
│   │   ├── config-dev.json
│   │   ├── config.json
│   │   └── configUtils.js
│   ├── index.html
│   ├── listenerCTRL
│   │   ├── cmdRec.js
│   │   ├── listener.js
│   │   ├── prefixRec.js
│   │   └── speechRecognition.js
│   ├── matchCTRL
│   │   ├── formatVariable.js
│   │   ├── matchCtrl.js
│   │   ├── matchingUtil.js
│   │   ├── parseCommands.js
│   │   ├── prefixTrie.js
│   │   ├── regMatch.js
│   │   └── testers
│   │       ├── JWDTest.js
│   │       ├── getMatchByScore.js
│   │       ├── index.html
│   │       ├── phoneticsTest.js
│   │       └── testCommands.js
│   ├── packages
│   │   ├── commands-phrases.json
│   │   ├── commands.json
│   │   └── core-utils.js
│   ├── utils
│   │   ├── loaders.js
│   │   ├── phraseTrie.js
│   │   └── utils.js
│   └── views
│       ├── dev
│       │   ├── actions
│       │   │   └── actions.js
│       │   ├── components
│       │   │   ├── about
│       │   │   │   └── about.js
│       │   │   ├── appContainer.js
│       │   │   ├── contact
│       │   │   │   └── contact.js
│       │   │   ├── landing
│       │   │   │   └── landing.js
│       │   │   ├── layout
│       │   │   │   └── layout.js
│       │   │   ├── packages
│       │   │   │   ├── commandsTable.js
│       │   │   │   └── packages.js
│       │   │   └── settings
│       │   │       └── settings.js
│       │   ├── constants
│       │   │   └── constants.js
│       │   ├── dispatchers
│       │   │   └── dispatcher.js
│       │   ├── main.js
│       │   ├── mixins
│       │   │   └── mixins.js
│       │   └── stores
│       │       ├── store.js
│       │       └── storeActions.js
│       └── dist
│           └── bundle.js
├── main.js
├── test
│   ├── commands-util.spec.js
│   ├── matching.spec.js
│   ├── parsing.spec.js
│   ├── phraseTrie.spec.js
│   └── tmp
│       ├── commands-phrases.json
│       ├── commands.js
│       ├── commands.json
│       ├── matching-test-cases.js
│       ├── phrases-tmp.js
│       ├── phrases.json
│       └── test.json
└── webpack.config.js

31 directories, 85 files
