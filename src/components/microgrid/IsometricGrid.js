import React from 'react';
import PropTypes from 'prop-types';

IsometricGrid.propTypes = {
  grid: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

function IsometricGrid ({grid, width, height}) {
  return (
    <svg className="grid" width={width} height={height}>
      {grid.map(el =>
        <polygon className="grid-tile"
          key={el.pos}
          data-pos={el.pos}
          points={el.points}/>
      )}
    </svg>
  );
}

export default IsometricGrid;
