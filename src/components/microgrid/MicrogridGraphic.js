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
        width: 400,
        height: 400 * tileRatio,
        margin: [0, 0]
      },
      gridSize: [3, 3],
      tile: {
        width: 200,
        height: 200 * tileRatio
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
    this.setGraphicSize();
  }

  setGraphicSize () {
    let componentWidth = this.graphic.offsetWidth;
    let tileWidth = componentWidth / (this.state.gridSize[1] + 1);
    let tileHeight = tileWidth / tileRatio;
    let margin = [tileHeight / 2, tileWidth / 2];
    let width = componentWidth - margin[1] * 2;
    let height = tileHeight * (this.state.gridSize[1]);
    this.setState({
      size: {width, height, margin},
      tile: {width: tileWidth, height: tileHeight}
    });
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
      left: width / 2 * (this.state.gridSize[0] + x - y - 1) + 'px',
      top: height / 2 * (x + y) + 'px',
      width: width + 'px'
    };
  }

  buildingTileStyles ([x, y]) {
    let {width, height} = this.state.tile;
    return {
      left: width / 2 * (this.state.gridSize[0] + x - y - 1) + 'px',
      top: height / 2 * (x + y) + 'px',
      width: width + 'px',
      height: height * 2 + 'px'
    };
  }

  tileCoords () {
    let {width, height} = this.state.tile;
    return isometricTileCoords(this.state.gridSize, [width, height]);
  }

  tilePolygons () {
    let {width, height} = this.state.tile;
    return this.tileCoords().map((row, y) => row.map((coords, x) => {
      return {points: isometricTilePolygonPoints([width, height], coords), pos: [y, x]};
    })).reduce((a,b) => a.concat(b), []);
  }

  render () {
    let {width, height, margin} = this.state.size;
    let graphicStyles = {
      width: width + 'px',
      height: height + 'px',
      margin: margin[0] + 'px ' + margin[1] + 'px'
    };

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

    return (
      <div className="system-graphic"
        ref={graphic => this.graphic = graphic}
      >
        <div className="graphic-content"
          style={graphicStyles}
        >

          <div className="ground">
            {ground}
          </div>

          <div className="buildings">
            {buildings}
          </div>

          <div className="markers">
            {markers}
          </div>

          <svg className="network">
            {grid}
          </svg>

        </div>
      </div>
    );
  }
}

MicrogridGraphic.propTypes = {
  timeline: PropTypes.object
};

export default MicrogridGraphic;
