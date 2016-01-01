import React from 'react';
import AppActions from '../../actions/actions';
import Store from '../../stores/store';
import storeWatchMixin from '../../mixins/mixins';


function getConfig() {
  return {
    config: Store.getConfig() };
}

const Settings = (props) => {
  const { config } = props;
  let {
    name,
    exactMatchThreshold,
    closeMatchThreshold } = config;
  return (
    <div className="text-center settings">
      <h1> Settings </h1>
      <div className="col-md-8 setting-input col-md-offset-2 text-left">
        <div className="row">
          <div className="col-md-4">
            <label> Call Name </label>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={ e => {
                name = e.target.value;
                AppActions.changeConfig({
                  name });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label> Exact Matching Threshold </label>
          </div>
          <div className="col-md-8">
            <input
              type="range"
              step="0.01"
              max="1"
              min="0"
              value={exactMatchThreshold}
              onChange={ e => {
                exactMatchThreshold = e.target.value;
                AppActions.changeConfig({
                  exactMatchThreshold });
              }}
            />
            <p className="pull-right">{exactMatchThreshold}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label> Close Matching Threshold </label>
          </div>
          <div className="col-md-8">
            <input
              type="range"
              step="0.01"
              max="1"
              min="0"
              value={closeMatchThreshold}
              onChange={ e => {
                closeMatchThreshold = e.target.value;
                AppActions.changeConfig({
                  closeMatchThreshold });
              }}
            />
            <p className="pull-right">{closeMatchThreshold}</p>
          </div>
        </div>
        <button
          className="btn btn-success pull-right"
          onClick={ () => {
            AppActions.saveConfig();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

Settings.propTypes = { config: React.PropTypes.object };

export default storeWatchMixin(Settings, getConfig);
