import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    const home = './assets/icons/home.png';
    const settings = './assets/icons/settings.png';
    const pkg = './assets/icons/package.png';
    const about = './assets/icons/about.png';
    const contact = './assets/icons/contactus.png';

    return (
      <div>
        <div className="navbar row">
          <div className="buttons-group">
            <div className="col-xs-4 pull-left buttons">
              <div id="home" className="col-xs-4 text-center">
                <Link className="link" to="/">
                  <img src={home} className="img-responsive img-icon"/>
                  <p className="nav-text">
                    Home
                  </p>
                </Link>
              </div>
              <div id="packages" className="col-xs-4 text-center">
                <Link to="packages">
                  <img src={pkg} className="img-responsive img-icon"/>
                  <p className="nav-text">
                    Packages
                  </p>
                </Link>
              </div>
              <div id="settings" className="col-xs-4 text-center">
                <Link to="settings">
                  <img src={settings} className="img-responsive img-icon"/>
                  <p className="nav-text">
                    Settings
                  </p>
                </Link>
              </div>
            </div>
            <div className="col-xs-4 pull-right buttons">
              <div id="about" className="col-xs-4 text-center button-right">
                <Link to="about">
                  <img src={about} className="img-responsive img-icon"/>
                  <p className="nav-text">
                    About
                  </p>
                </Link>
              </div>
              <div id="contact" className="col-xs-4 text-center button-right">
                <Link to="contact">
                  <img src={contact} className="img-responsive img-icon"/>
                  <p className="nav-text">
                    Contact
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row content">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = { children: React.PropTypes.element.isRequired };
