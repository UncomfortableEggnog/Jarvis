# Jarvis v.0.0.1 Beta

> Jarvis is a voice command desktop application for Mac OS.  With Jarvis, you can control your computer with your voice.  Jarvis comes with a core command package that lets you adjust volume, brightness, text size, open applications, check the weather, look up documents on Wikipedia, get driving directions, etc.  For a full list of core commands, see [Core Commands](#Core-Commands).
>
>
> Jarvis is fully customizable and extendable.  You can extend Jarvis's capabilities by downloading additional packages on our website at [voicecommand.herokuapp.com](https://voicecommand.herokuapp.com).  Additionally, you can create your own packages on our website, review and rate other packages.   
>
>
> Jarvis has the ability to learn.  If Jarvis cannot find an exact match to your voice command, Jarvis will attempt to find a close match and then ask for confirmation.  If you say "yes", Jarvis will remember that you say the voice command in this way.  

## Team

- __Product Owner__: Mitchell Wilcox
- __Scrum Master__: Tracy Duong
- __Development Team Members__: Andres Morales, Yilen Pan

## Table of Contents

1. [Usage](#Usage)
    1. [Core Commands](#Core Commands)
    1. [Getting Started](#Getting Started)
1. [Development](#development)
    1. [Requirements](#requirements)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

### Core Commands
 The following commands come with Jarvis's core package.
<pre><code>
 say &ltphrase>
 enhance
 zoom in
 zoom out
 dehance
 what time is it?
 what's todays date
 check the weather in &ltplace>
 dim screen
 bright screen
 volume down
 volume up
 volume off
 youtube &ltsearch query>
 google &ltsearch query>
 wiki &ltsearch query>
 directions from &ltplace> to &ltplace>
 open &ltapplication name>
 turn volume up by &lt0-100> percent
</code></pre>

### Getting Started

Download and install Jarvis Voice Command Desktop Application by visiting [voicecommand.herokuapp.com](http://voicecommand.herokuapp.com).

Once you've opened the application, Jarvis constantly listens for his name in the background.  Activate the command listener by saying "Jarvis" (you can customize his name in Settings.)  Listen for the bleep confirmation then say a command.

Example:

<pre><code>Jarvis
</code></pre>

Listen for the bleep confirmation

<pre><code>What time is it?
</code></pre>

For additional usage information, see our [How To Use](link to Andres's doc) guide

## Development

### Requirements

- Electron v0.35.4
- Node 0.10.x


### Installing Dependencies

From within the project root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
