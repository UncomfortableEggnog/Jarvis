import React from 'react';
import CommandsTable from './commandsTable';
import AppActions from '../../actions/actions';


function isJSON(fileName) {
  const splitFN = fileName.split('.');
  return splitFN[splitFN.length - 1].match(/json/i);
}

function handleFile(e) {
  e.preventDefault();
  const file = e.target.files[0];
  const filePath = file.path;
  const fileName = file.name;
  if (isJSON(fileName) === null) {
    alert('The package needs to be a JSON file');
  } else {
    AppActions.loadPackage(filePath);
  }
}

const Packages = () => {
  return (
    <div className="row packages">
      <div className="col-xs-12">
        <div className="col-xs-4">
          <h1>Commands</h1>
        </div>
        <div className="col-xs-8">
          <h2
            className="text-right"
            onClick={() => {
              AppActions.addCommand();
            }}
          >
            +
          </h2>
        </div>
      </div>
      <div className="col-xs-12">
        <table className="table commandheader">
          <thead>
            <tr>
              <th>Voice Command</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="commandtable">
          <CommandsTable />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-3 pull-right">
          <form
            className="uploadButton"
            encType="multipart/form-data"
          >
            <button
              onClick={ () => {
                document.getElementById('upload').click();
              }}
              className="btn btn-success"
            >
              Load Package
            </button>
            <input
              id="upload"
              style={{ opacity: 0 }}
              type="file"
              onChange={handleFile.bind(this)}
            />
          </form>
        </div>
      </div>
    </div>
    );
};


export default Packages;
