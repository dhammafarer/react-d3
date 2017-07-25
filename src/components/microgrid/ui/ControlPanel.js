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
        <button className="button"
          key={i}
          onClick={() => setActiveSystem(i)}>
          {el.name}
        </button>
      )}
    </div>
  );
}


export default ControlPanel;
