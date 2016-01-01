import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Layout from './layout/layout';
import Packages from './packages/packages';
import Settings from './settings/settings';
import Landing from './landing/landing';
import Contact from './contact/contact';
import About from './about/about';

export default class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Layout}>
          <IndexRoute component={Landing} />
          <Route path="landing" component={Landing}/>
          <Route path="packages" component={Packages}/>
          <Route path="settings" component={Settings}/>
          <Route path="contact" component={Contact}/>
          <Route path="about" component={About}/>
        </Route>
      </Router>
    );
  }
}
