import React from 'react';
import PropTypes from 'prop-types';

BuildingMarkers.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};

function BuildingMarkers ({data, height, handleClick}) {
  return (
    <div className="markers">
      {data.map((el, i) =>
        <div key={el.pos} className="tile" style={{...el.style, height: height}}>
          <div className="marker-tile">
            <div className="dot-background"/>
            <div className="dot" onClick={(e) => handleClick(e, el)}/>
          </div>
        </div>)}
    </div>
  );
}

export default BuildingMarkers;
