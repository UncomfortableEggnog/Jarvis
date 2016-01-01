import React from 'react';
import Store from '../stores/store';

export default (InnerComponent, stateCallback) => class extends React.Component {
  constructor(props) {
    super(props);
    // Get initial state from stateCallback
    this.state = stateCallback(props);
    // bind _onChange callback and add to listener
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    Store.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(stateCallback(this.props));
  }
  render() {
    return <InnerComponent {...this.state} {...this.props} />;
  }
};
