import React from 'react';
import PropTypes from 'prop-types';
import './MicrogridChart.scss';
import { isometricTileCoords, isometricTilePolygonPoints } from '../../helpers/isometric-grid.js';
import * as o from '../../data/microgrid-objects.js';
import GroundTiles from './GroundTiles.js';
import BuildingTiles from './BuildingTiles.js';
import IsometricGrid from './IsometricGrid.js';
import BuildingMarkers from './BuildingMarkers.js';

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
        [o.grass, o.grass, o.grass],
        [o.grass, o.grass, o.grass],
        [o.grass, o.grass, o.grass]

      ],
      buildingsMap: [
        [o.temple, null, o.solar],
        [o.house, null, o.house],
        [null, o.factory, null]
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

  tileCoords () {
    let {width, height} = this.state.tile;
    return isometricTileCoords(this.state.gridSize, [width, height]);
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

    let ground = this.mapToIso(this.state.groundMap);
    let buildings = this.mapToIso(this.state.buildingsMap).filter(el => el.tile);
    let grid = this.tilePolygons();

    return (
      <div className="system-graphic" ref={graphic => this.graphic = graphic}>
        <div className="graphic-content" style={graphicStyles}>

          <GroundTiles ground={ground}/>
          <BuildingTiles buildings={buildings}/>
          <IsometricGrid grid={grid} width={width} height={height}/>
          <BuildingMarkers data={buildings} height={this.state.tile.height}/>

        </div>
      </div>
    );
  }
}

MicrogridGraphic.propTypes = {
  timeline: PropTypes.object
};

export default MicrogridGraphic;
