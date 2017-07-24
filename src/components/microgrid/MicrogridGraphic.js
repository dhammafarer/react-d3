import React from 'react';
import PropTypes from 'prop-types';
import './MicrogridChart.scss';
import { isometricTileCoords, isometricTilePolygonPoints } from '../../helpers/isometric-grid.js';

const tiles = {
  grid: require('../../assets/0.png'),
  grass: require('../../assets/grass.png'),
  stone: require('../../assets/stone.png'),
  temple: require('../../assets/temple.png'),
  factory: require('../../assets/factory.png'),
  solar: require('../../assets/solar.png'),
  house: require('../../assets/house.png')
};

const tileRatio = 1.7345;

class MicrogridGraphic extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      size: {
        width: 0,
        height: 0,
        padding: 0
      },
      grid: [3, 3],
      tile: {
        width: 200,
        height: 0
      },
      groundMap: [
        ['grass', 'grass', 'grass'],
        ['grass', 'grass', 'grass'],
        ['stone', 'stone', 'grass']

      ],
      buildingsMap: [
        ['temple', null, 'solar'],
        ['house', null, 'house'],
        [null, 'factory', null]
      ]
    };
  }
  componentDidMount () {
    let width = this.graphic.offsetWidth / (this.state.grid[0] + 1);
    let height = width / tileRatio;
    this.setState({
      tile: {width, height}
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.tile.width != this.state.tile.width) {
      let {height, width, padding} = this.graphicStyles();
      this.graphic.style.height = height + 'px';
      this.graphic.style.width = width + 'px';
      this.graphic.style.padding = padding + 'px';
    }
  }

  graphicStyles () {
    let {width, height} = this.state.tile;
    return {
      height: height * (this.state.grid[0] + 1),
      width: width * (this.state.grid[0] + 1),
      padding: height / 2
    };
  }

  ground () {
    return this.state.groundMap
      .map((row, y) => row
        .map((el, x) => {
          return {type: el, pos: [x, y]};
        })
      )
      .reduce((a, b) => a.concat(b), []);
  }

  buildings () {
    return this.state.buildingsMap
      .map((row, y) => row
        .map((el, x) => {
          return {type: el, pos: [x, y]};
        })
      )
      .reduce((a, b) => a.concat(b), []);
  }

  groundTileStyles ([x, y]) {
    let {width, height} = this.state.tile;
    return {
      left: width / 2 * (this.state.grid[0] + x - y - 1) + 'px',
      top: height / 2 * (x + y) + 'px',
      width: width + 'px'
    };
  }

  buildingTileStyles ([x, y]) {
    let {width, height} = this.state.tile;
    return {
      left: width / 2 * (this.state.grid[0] + x - y - 1) + 'px',
      top: height / 2 * (x + y) + 'px',
      width: width + 'px',
      height: height * 2 + 'px'
    };
  }

  tileCoords () {
    let {width, height} = this.state.tile;
    return isometricTileCoords(this.state.grid, [width, height]);
  }

  tilePolygons () {
    let {width, height} = this.state.tile;
    return this.tileCoords().map((row, y) => row.map((coords, x) => {
      return {points: isometricTilePolygonPoints([width, height], coords), pos: [y, x]};
    })).reduce((a,b) => a.concat(b), []);
  }

  render () {
    let ground = this.ground().map((tile, i) =>
      <div key={i} className="tile" style={this.groundTileStyles(tile.pos)}>
        <img className="ground-tile" src={tiles[tile.type]}/>
      </div>);

    let buildings = this.buildings()
      .filter(tile => tile.type)
      .map((tile, i) =>
        <div key={i} className="tile" style={this.buildingTileStyles(tile.pos)}>
          <img className="building-tile" src={tiles[tile.type]}/>
        </div>);

    let markers = this.buildings()
      .filter(tile => tile.type)
      .map((tile, i) =>
        <div key={i} className="tile" style={this.buildingTileStyles(tile.pos)}>
          <div className="dot-background"/>
          <div className="dot" datatype={tile.type}/>
        </div>);

    let grid = this.tilePolygons().map(el =>
      <polygon className="grid-tile" key={el.pos} data-pos={el.pos} points={el.points}/>
    );

    let {width, height, padding} = this.graphicStyles();

    return (
      <div className="system-graphic" ref={graphic => this.graphic = graphic}>
        <div className="graphic-content">

          <div className="ground">
            {ground}
          </div>

          <div className="buildings">
            {buildings}
          </div>

          <div className="markers">
            {markers}
          </div>

          <div className="network">
            <svg width={width - padding * 2} height={height - padding * 2}>
              {grid}
            </svg>
          </div>

        </div>
      </div>
    );
  }
}

MicrogridGraphic.propTypes = {
  timeline: PropTypes.object
};

export default MicrogridGraphic;
