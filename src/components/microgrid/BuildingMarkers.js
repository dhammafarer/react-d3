import React from 'react';
import PropTypes from 'prop-types';

BuildingMarkers.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired
};

function BuildingMarkers ({data, height}) {
  return (
    <div className="markers">
      {data.map(el =>
        <div key={el.pos} className="tile" style={{...el.style, height: height}}>
          <div className="marker-tile">
            <div className="dot-background"></div>
            <div className="dot"></div>
          </div>
        </div>)}
    </div>
  );
}

export default BuildingMarkers;
