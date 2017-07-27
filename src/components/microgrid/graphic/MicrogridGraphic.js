import React from 'react';
import PropTypes from 'prop-types';
import './MicrogridGraphic.scss';
import { isometricTileCoords, isometricTilePolygonPoints } from '../../../helpers/isometric-grid.js';
import GroundTiles from './GroundTiles.js';
import BuildingTiles from './BuildingTiles.js';
import IsometricGrid from './IsometricGrid.js';
import NetworkLines from './NetworkLines.js';
import BuildingMarkers from './BuildingMarkers.js';
import { TimelineMax } from 'gsap';

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
      tile: {
        width: 200,
        height: 200 * tileRatio
      },
      tl: new TimelineMax()
    };
  }
  componentDidMount () {
    window.addEventListener('resize', () => this.setGraphicSize());
    this.setGraphicSize();
    this.animateEnter();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.gridSize != this.props.gridSize) {
      this.setGraphicSize();
    }
    if (prevProps.name != this.props.name) {
      this.animateEnter();
    }
  }

  animateEnter () {
    this.state.tl
      .clear()
      .from('.ground-tile', 0.5, {opacity: 0.8, transform: 'scale(0.0)', y: '+=2', ease: 'Cubic.easeOut'}, 0.1)
      .from('.grid', 0.3, {opacity: 0})
      .staggerFrom('.building-tile', 0.3, {opacity: 0}, 0.2)
      .from(['.marker-tile'], 0.5, {transform: 'scale(0)', opacity: 0}, '-=0.1')
      .from('.powerline', 0.5, {opacity: 0}, "-=0.3")
      .from('.powerflow', 0.5, {opacity: 0}, "+=0.3");
  }

  setGraphicSize () {
    let componentWidth = this.graphic.offsetWidth;
    let tileWidth = componentWidth / (this.props.gridSize[1] + 1);
    let tileHeight = tileWidth / tileRatio;
    let margin = [tileHeight / 2, tileWidth / 2];
    let width = componentWidth - margin[1] * 2;
    let height = tileHeight * (this.props.gridSize[1]);
    this.setState({
      size: {width, height, margin},
      tile: {width: tileWidth, height: tileHeight}
    });
  }

  mapToIso (objectsMap) {
    return objectsMap
      .map((row, y) => row
        .map((tile, x) => {
          let coords = this.tileCoords()[y][x];
          let style = {
            left: coords.x,
            top: coords.y,
            width: this.state.tile.width
          };
          return {tile, pos: [x, y], style};
        })
      )
      .reduce((a, b) => a.concat(b), []);
  }

  arrayToIso (array) {
    return array.map(el => {
      /* eslint-disable no-console */
      let coords = this.tileCoords()[el.pos[0]][el.pos[1]];
      let style = {
        left: coords.x,
        top: coords.y,
        width: this.state.tile.width
      };
      el.style = style;
      return el;
    });
  }

  tileCoords () {
    let {width, height} = this.state.tile;
    return isometricTileCoords(this.props.gridSize, [width, height]);
  }

  tilePolygons () {
    let {width, height} = this.state.tile;
    return this.tileCoords()
      .map((row, y) => row.map((coords, x) => {
        return {
          points: isometricTilePolygonPoints([width, height], coords),
          pos: [y, x]};
      }))
      .reduce((a,b) => a.concat(b), []);
  }

  render () {
    let {width, height, margin} = this.state.size;
    let graphicStyles = {
      width, height,
      margin: margin[0] + 'px ' + margin[1] + 'px'
    };

    let ground = this.mapToIso(this.props.terrainMap).filter(el => el.tile);
    let buildings = this.arrayToIso(this.props.buildings);
    let grid = this.tilePolygons();

    return (
      <div className="system-graphic" ref={graphic => this.graphic = graphic}>
        <h2>{this.props.name}</h2>
        <div className="graphic-content" style={graphicStyles}>

          <GroundTiles ground={ground}/>
          <IsometricGrid grid={grid} width={width} height={height}/>
          <BuildingTiles buildings={buildings}/>
          <NetworkLines data={buildings} tile={this.state.tile} width={width} height={height}/>
          <BuildingMarkers data={buildings} height={this.state.tile.height} handleClick={this.props.openGraphicModal}/>

        </div>
      </div>
    );
  }
}

MicrogridGraphic.propTypes = {
  name: PropTypes.string.isRequired,
  gridSize: PropTypes.array.isRequired,
  terrainMap: PropTypes.array.isRequired,
  buildings: PropTypes.array.isRequired,
  openGraphicModal: PropTypes.func.isRequired

};

export default MicrogridGraphic;
