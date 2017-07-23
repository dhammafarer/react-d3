/* global describe it expect */
import { isometricTileCoords, isometricTilePolygonPoints } from './isometric-grid.js';

describe('isometricTileCoords', () => {
  it('outputs an array of isometric coords', () => {
    let tileSize = [200, 100];
    let gridSize = [2, 2];
    let result = isometricTileCoords(gridSize, tileSize);
    let expected = [
      [{x: 100, y: 0}, {x: 200, y: 50}],
      [{x: 0, y: 50}, {x: 100, y: 100}]
    ];

    expect(result).toEqual(expected);
  });
});

describe('isometricTilePolygoPoints', () => {
  it('given tile position, returns an array of polygon points', () => {
    let tileSize = [200, 100];
    let tileCoords = {x: 100, y: 0};
    let result = isometricTilePolygonPoints(tileSize, tileCoords);
    let expected = '200,0 300,50 200,100 100,50';

    expect(result).toEqual(expected);
  });
});
