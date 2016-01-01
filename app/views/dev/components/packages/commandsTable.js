import React from 'react';
import Store from '../../stores/store';
import AppActions from '../../actions/actions';
import Constants from '../../constants/constants';
import storeWatchMixin from '../../mixins/mixins';

function getCommands() {
  return { commands: Store.getCommands() };
}

// NOTE: NEVER USE DEFAULTVALUE.


const CommandsTable = (props) => {
  const { commands } = props;
  return (
    <table className="table">
      <tbody>
        { commands.map((commandObj, i) => {
          const cmd = Object.keys(commandObj)[0];
          return (
            <tr key={i}>
              <td
                onClick={ () => AppActions.deleteCommand(i) }
              >
                x
              </td>
              <td>
                <input
                  type="text"
                  value={cmd}
                  onChange={e => {
                    e.preventDefault();
                    AppActions.updateCommand({
                      index: i,
                      change: e.target.value,
                      type: Constants.COMMAND });
                  }}
                  onBlur={() => AppActions.saveCommands()}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={commandObj[cmd]}
                  onChange={e => {
                    e.preventDefault();
                    AppActions.updateCommand({
                      index: i,
                      change: e.target.value,
                      type: Constants.ACTION });
                  }}
                  onBlur={ () => AppActions.saveCommands() }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CommandsTable.propTypes = {
  commands: React.PropTypes.array };

export default storeWatchMixin(CommandsTable, getCommands);
