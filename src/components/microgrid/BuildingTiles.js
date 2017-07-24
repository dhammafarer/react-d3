import React from 'react';
import PropTypes from 'prop-types';

BuildingTiles.propTypes = {
  buildings: PropTypes.array.isRequired
};

function BuildingTiles ({buildings}) {
  return (
    <div className="buildings">
      {buildings.filter(el => el.tile)
        .map((el, i) =>
          <div key={i} className="tile" style={el.style}>
            <img className="building-tile" src={el.tile.src}/>
          </div>)}
    </div>
  );
}

export default BuildingTiles;
