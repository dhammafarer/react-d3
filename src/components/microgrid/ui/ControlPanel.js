import React from 'react';
import PropTypes from 'prop-types';
import './ControlPanel.scss';

ControlPanel.propTypes = {
  systems: PropTypes.array.isRequired,
  setActiveSystem: PropTypes.func.isRequired
};

function ControlPanel ({systems, setActiveSystem}) {
  return (
    <div className="control-panel menu">
      <h3>Control Panel</h3>
      {systems.map((el, i) =>
        <div key={i}>
          <button className="button"
            onClick={() => setActiveSystem(i)}>
            {el.name}
          </button>
        </div>
      )}
    </div>
  );
}


export default ControlPanel;
