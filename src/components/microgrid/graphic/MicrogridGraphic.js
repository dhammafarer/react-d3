import React from 'react';
import PropTypes from 'prop-types';
import './MicrogridGraphic.scss';
import { isometricTileCoords,
  tilePolygons,
  mapToIso,
  arrayToIso
} from '../../../helpers/isometric-grid.js';
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
    this.setGraphicSize = this.setGraphicSize.bind(this);
  }
  componentDidMount () {
    this.setGraphicSize();
    window.addEventListener('resize', () => this.setGraphicSize());
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
      .staggerFrom('.building-tile', 0.5, {y: "-=10", opacity: 0, ease: 'Cubic.easeOut'}, 0.2)
    //.from('.building-tile', 0.5, {top: '-=5', transform: 'scale(0.8)', opacity: 0}, '-=0.2')
      .from(['.marker-tile'], 0.5, {transform: 'scale(0)', opacity: 0}, '-=0.1')
      .from('.powerline', 0.5, {opacity: 0}, "-=0.8")
      .from('.powerflow', 0.5, {opacity: 0}, "-=0.2");
  }

  /* eslint-disable no-console */
  setGraphicSize () {
    let componentWidth = this.graphic.offsetWidth;
    let componentHeight = this.graphic.offsetHeight;
    let gridSize = this.props.gridSize;
    let y = gridSize[0] + 1; // column length + 1x tile height for margin
    let x = gridSize[1] + 1; // row length + 1x tile width for margin
    let tileHeight = componentHeight / y;
    let tileWidth = componentWidth / x;
    let altHeight = tileWidth / tileRatio;

    if (tileHeight < altHeight) {
      tileWidth = tileHeight * tileRatio;
    } else {
      tileHeight = altHeight;
    }

    let width = tileWidth * gridSize[1];
    let height = tileHeight * gridSize[0];
    let margin = [(componentHeight - height) / 2, (componentWidth - width) / 2];

    this.setState({
      size: {width, height, margin},
      tile: {width: tileWidth, height: tileHeight}
    });
  }

  tileCoords (gridSize, tile) {
    let {width, height} = tile;
    return isometricTileCoords(gridSize, [width, height]);
  }

  render () {
    let {width, height, margin} = this.state.size;
    let tile = this.state.tile;
    let {gridSize, terrainMap, buildings} = this.props;
    let graphicStyles = {
      width, height, margin: margin[0] + 'px ' + margin[1] + 'px'
    };

    let isotable = this.tileCoords(gridSize, tile);
    let terrainLayer = mapToIso(isotable, tile, terrainMap).filter(el => el.texture);
    let buildingsLayer = arrayToIso(isotable, tile, buildings);
    let grid = tilePolygons(isotable, tile);

    return (
      <div className="microgrid-graphic" ref={graphic => this.graphic = graphic}>
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
