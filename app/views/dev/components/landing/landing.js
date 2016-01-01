import React from 'react';

export default class Landing extends React.Component {
  render() {
    const backgroundStyle = {
      color: '#343D5C',
      height: '100vh',
      textAlign: 'center',
      position: 'relative',
      marginTop: 100,
      fontFamily: '"Courier New", Courier, monospace' };

    const titleStyle = {
      backgroundImage: 'url(./assets/img/jarvis-transparent.gif)',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      height: 200,
      width: 200,
      margin: 'auto',
      display: 'inline-block' };

    return (
      <div style={backgroundStyle}>
            <div><h4>Hello, My name is Jarvis</h4></div>
        <div className="jarvis" style={titleStyle}></div>
            <div><h4>Please say a command</h4></div>
      </div>
    );
  }
}
