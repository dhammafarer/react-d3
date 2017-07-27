import React from 'react';
import PropTypes from 'prop-types';

BuildingMarkers.propTypes = {
  data: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};

function BuildingMarkers ({data, handleClick}) {
  return (
    <div className="markers">
      {data.map((el) =>
        <div key={el.pos} className="tile" style={el.style}>
          <div className="marker-tile">
            <div className="dot-background"/>
            <div className="dot" onClick={(e) => handleClick(e, el)}/>
          </div>
        </div>)}
    </div>
  );
}

export default BuildingMarkers;
