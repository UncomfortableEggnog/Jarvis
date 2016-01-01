import React from 'react';
import openBrowser from '../../../../bashCTRL/execShellCommand';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    const aboutStyle =
      {
        position: 'relative',
        marginTop: '10%',
        transform: 'translateX(30%)',
        width: '80vh',
        textAlign: 'center',
        color: '#343D5C',
        fontFamily: '"Courier New", Courier, monospace',
      };

    const aboutText = 'Welcome to a new world of awesome.  We are software ' +
      'engineers and explorers currently living in the San Francisco Bay Area.  ' +
      'Check the website for updates and reach out if we made your world just ' +
      'a little bit more like Blade Runner.';

    return (
      <div style={aboutStyle}>
        <div className="primary-header">
          <h1>Jarvis</h1>
          <h3>Version 0.0.1</h3>
          <h5><strong>Voice Command for your Computer</strong></h5>
        </div>
        <div>
          <p>{aboutText}</p>
          <p>Tracy x Yilen x Andres x Mitchell</p>
          <a
            onClick={ () => {
              openBrowser('open http://voicecommand.herokuapp.com');
            }}
          >
          www.voicecommand.herokuapp.com
          </a>
          <p>
            <a
              onClick={() => {
                openBrowser('open https://github.com/UncomfortableEggnog/UncomfortableEggnog-Desktop');
              }}
            >
            Documentation...
            </a>
          </p>
        </div>
      </div>
    );
  }
}
