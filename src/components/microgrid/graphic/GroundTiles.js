import React from 'react';
import PropTypes from 'prop-types';

GroundTiles.propTypes = {
  ground: PropTypes.array.isRequired
};

function GroundTiles ({ground}) {
  return (
    <div className="ground">
      {ground.map((el, i) =>
        <div key={i} className="tile" style={el.style}>
          <img className="ground-tile" src={el.tile.src}/>
        </div>)}
    </div>
  );
}

export default GroundTiles;
