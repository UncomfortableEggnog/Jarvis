import React from 'react';
import { render } from 'react-dom';
import AppContainer from './components/appContainer';

require('./stylesheets/main.scss');

render(<AppContainer />, document.getElementById('app'));
