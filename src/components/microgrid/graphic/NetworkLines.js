import React from 'react';
import PropTypes from 'prop-types';
import { line, curveCardinal } from 'd3';

NetworkLines.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  tile: PropTypes.object.isRequired
};

function NetworkLines ({data, width, height, tile}) {
  let distLines = [];
  let genLines = [];
  let distributor = data.find(el => el.texture.type == 'distributor');
  let generators = data.filter(el => el.texture.type == 'generator');

  let consumers = data.filter(el => el.texture.type == 'consumer');
  // position endpoints in the middle of the tile
  let offsetWidth = tile.width / 2;
  let offsetHeight = tile.height * 1.5;

  if (consumers.length && distributor) {
    distLines = consumers
      .map(({style, texture, data}) => {
        return [
          {x: distributor.style.left + offsetWidth, y: distributor.style.top + offsetHeight},
          {x: style.left + offsetWidth, y: style.top + offsetHeight}
        ];
      });
  }

  if (consumers.length && distributor && generators.length) {
    genLines = generators
      .map(({style, texture, data}) => {
        return [
          {x: style.left + offsetWidth, y: style.top + offsetHeight},
          {x: distributor.style.left + offsetWidth, y: distributor.style.top + offsetHeight},
          data
        ];
      });
  }

  let activeGens = generators.some(el => el.data.active);

  return (
    <svg className="grid" width={width} height={height}>
      {distLines.map((con, i) =>
        <g key={i} >
          <path d={link(con)} className="powerline distribution"/>
          {activeGens && <path d={link(con)} className="powerflow"/>}
        </g>
      )}

      {genLines.map((con, i) =>
        <g key={i} >
          <path d={link(con)} className="powerline generation"/>
          {con[2].active && <path d={link(con)} className="powerflow"/>}
        </g>
      )}
    </svg>
  );
}

export default NetworkLines;

// draw curved lines between source and target points
function link ([s, t]) {
  return [
    'M',
    [s.x, s.y],
    'Q',
    [t.x + (s.x - t.x) / 2, t.y - 20],
    [t.x, t.y]
  ].join(' ');
}
