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
  let cons = [];
  let producer = data.find(el => el.tile.name == 'solar');

  if (producer) {
    let users = data.filter(el => el.tile.name != 'solar');
    let offsetWidth = tile.width / 2;
    let offsetHeight = tile.height / 2;

    cons = users
      .map(({style}) => [
        {x: producer.style.left + offsetWidth, y: producer.style.top + offsetHeight},
        {x: style.left + offsetWidth, y: style.top + offsetHeight}
      ]);
  }

  return (
    <svg className="grid" width={width} height={height}>
      {cons.map((con, i) =>
        <g key={i} >
          <path d={link(con)} className="powerline"/>
          <path d={link(con)} className="powerflow"/>
        </g>
      )}
    </svg>
  );
}

export default NetworkLines;

function link (d) {
  let s = d[0];
  let t = d[1];

  return [
    'M',
    [s.x, s.y],
    'Q',
    [t.x + (s.x - t.x) / 2, t.y - 20],
    [t.x, t.y]
  ].join(' ');
}
