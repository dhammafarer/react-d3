import React from 'react';
import PropTypes from 'prop-types';

BuildingMarkers.propTypes = {
  data: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};

function BuildingMarkers ({data, handleClick}) {
  return (
    <div className="markers">
      {data.map((el) => {
        return (
          <div key={el.pos} className="tile" style={convertStyle(el)}>
            <div className="marker-tile">
              <div className="dot-background"/>
              <div className="dot" onClick={(e) => handleClick(e, el)}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BuildingMarkers;

function convertStyle (el) {
  let height = el.style.height / el.texture.height;
  let top = el.style.top + (el.texture.offsetHeight * height);
  return {
    height,
    top,
    left: el.style.left,
    width: el.style.width
  };
}
