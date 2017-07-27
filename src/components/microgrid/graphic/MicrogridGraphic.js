import React from 'react';
import PropTypes from 'prop-types';
import './MicrogridGraphic.scss';
import { isometricTileCoords, isometricTilePolygonPoints } from '../../../helpers/isometric-grid.js';
import TerrainTiles from './TerrainTiles.js';
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
      .from('.terrain-tile', 0.5, {opacity: 0.8, transform: 'scale(0.0)', y: '+=2', ease: 'Cubic.easeOut'}, 0.1)
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

  mapToIso (isotable, tile, objectsMap) {
    return objectsMap
      .map((row, y) => row
        .map((texture, x) => {
          let coords = isotable[y][x];
          let style = {
            left: coords.x,
            top: coords.y,
            width: tile.width,
            height: tile.height * texture.height
          };
          return {texture, pos: [x, y], style};
        })
      )
      .reduce((a, b) => a.concat(b), []);
  }

  arrayToIso (isotable, tile, array) {
    return array.map(el => {
      let coords = isotable[el.pos[0]][el.pos[1]];
      let style = {
        left: coords.x,
        top: coords.y - (tile.height * el.texture.offsetHeight),
        width: tile.width,
        height: tile.height * el.texture.height
      };
      el.style = style;
      return el;
    });
  }

  tileCoords (gridSize, tile) {
    let {width, height} = tile;
    return isometricTileCoords(gridSize, [width, height]);
  }

  tilePolygons (isotable, tile) {
    let {width, height} = tile;
    return isotable.map((row, y) => row
      .map((coords, x) => {
        return {
          points: isometricTilePolygonPoints([width, height], coords),
          pos: [y, x]};
      }))
      .reduce((a,b) => a.concat(b), []);
  }

  render () {
    let {width, height, margin} = this.state.size;
    let tile = this.state.tile;
    let {gridSize, terrainMap, buildings} = this.props;
    let graphicStyles = {
      width, height, margin: margin[0] + 'px ' + margin[1] + 'px'
    };

    let isotable = this.tileCoords(gridSize, tile);
    let terrainLayer = this.mapToIso(isotable, tile, terrainMap).filter(el => el.texture);
    let buildingsLayer = this.arrayToIso(isotable, tile, buildings);
    let grid = this.tilePolygons(isotable, tile);

    return (
      <div className="system-graphic" ref={graphic => this.graphic = graphic}>
        <h2>{this.props.name}</h2>
        <div className="graphic-content" style={graphicStyles}>

          <TerrainTiles terrain={terrainLayer}/>
          <IsometricGrid grid={grid} width={width} height={height}/>
          <BuildingTiles buildings={buildingsLayer}/>
          <NetworkLines data={buildings} tile={this.state.tile} width={width} height={height}/>
          <BuildingMarkers data={buildings} handleClick={this.props.openGraphicModal}/>

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
