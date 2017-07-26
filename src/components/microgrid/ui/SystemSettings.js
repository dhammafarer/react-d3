import React from 'react';
import PropTypes from 'prop-types';
import './SystemSettings.scss';

SystemSettings.propTypes = {
  systems: PropTypes.array.isRequired,
  activeIdx: PropTypes.number.isRequired,
  toggleBuildingState: PropTypes.func.isRequired
};

/* eslint-disable no-console */
function SystemSettings ({systems, activeIdx, toggleBuildingState}) {
  const system = systems[activeIdx];
  return (
    <div className="system-settings">
      {system.name} Settings
      <div>
        <ul>
          {system.buildings.map((el, i) =>
            <li key={i}>
              {el.name}
              {el.tile.type == 'generator' &&
                <button onClick={() => toggleBuildingState(i)}>
                  {el.data.active ? 'on' : 'off'}
                </button>
              }
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}


export default SystemSettings;
