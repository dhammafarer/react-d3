import React from 'react';
import PropTypes from 'prop-types';

TerrainTiles.propTypes = {
  terrain: PropTypes.array.isRequired
};

function TerrainTiles ({terrain}) {
  return (
    <div className="terrain">
      {terrain.map((el, i) =>
        <div key={i} className="tile" style={el.style}>
          <img className="terrain-tile" src={el.texture.src}/>
        </div>)}
    </div>
  );
}

export default TerrainTiles;
