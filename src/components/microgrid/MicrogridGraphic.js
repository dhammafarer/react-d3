import React from 'react';
import PropTypes from 'prop-types';
import './MicrogridChart.scss';

const tiles = {
  grid: require('../../assets/0.png'),
  grass: require('../../assets/grass.png'),
  stone: require('../../assets/stone.png'),
  temple: require('../../assets/temple.png'),
  factory: require('../../assets/factory.png'),
  solar: require('../../assets/solar.png'),
  house: require('../../assets/house.png')
};

class MicrogridGraphic extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tileRatio: 1.7345,
      tileWidth: 200,
      tileHeight: 0,
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
    let width = this.graphic.offsetWidth / (this.state.groundMap.length + 1);
    this.setState({
      tileWidth: width,
      tileHeight: width / this.state.tileRatio
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.tileWidth != this.state.tileWidth) {
      this.graphic.style.height = this.state.tileHeight * (this.state.groundMap.length + 1) + 'px';
      this.graphic.style.width = this.state.tileWidth * (this.state.groundMap.length + 1) + 'px';
      this.graphic.style.padding = this.state.tileHeight / 2 + 'px';
    }
  }

  graphicStyles () {
    return {
      width: this.state.tileWidth * this.state.groundMap.length + 'px',
      height: this.state.tileHeight * (this.state.groundMap.length + 2) + 'px',
      padding: this.state.tileHeight + 'px'
    };
  }

  getTileHeight () {
    return this.state.tileWidth / this.state.tileRatio;
  }

  grid () {
    return this.ground().map(tile => Object.assign({}, tile, {type: 'grid'}));
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
    return {
      left: this.state.tileWidth / 2 * (this.state.groundMap.length + x - y - 1) + 'px',
      top: this.state.tileHeight / 2 * (x + y) + 'px',
      width: this.state.tileWidth + 'px'
    };
  }

  buildingTileStyles ([x, y]) {
    return {
      left: this.state.tileWidth / 2 * (this.state.groundMap.length + x - y - 1) + 'px',
      top: this.state.tileHeight / 2 * (x + y) + 'px',
      width: this.state.tileWidth + 'px',
      height: this.state.tileHeight * 2 + 'px'
    };
  }

  render () {
    let grid = this.ground().map((tile, i) =>
      <div key={i} className="tile" style={this.groundTileStyles(tile.pos)}>
        <img className="grid-tile" src={tiles['grid']}/>
      </div>);

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

    return (
      <div className="system-graphic" ref={graphic => this.graphic = graphic}>
        <div className="graphic-content">

          <div className="grid">
            {grid}
          </div>

          <div className="ground">
            {ground}
          </div>

          <div className="buildings">
            {buildings}
          </div>

          <div className="markers">
            {markers}
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
