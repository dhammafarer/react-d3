/* global describe it expect */
import { getIsometricTileCoords } from './isometric-grid.js';

describe('getIsometricTileCoords', () => {
  it('outputs an array of isometric coords', () => {
    let tileSize = [200, 100];
    let gridSize = [2, 2];
    let result = getIsometricTileCoords(gridSize, tileSize);
    let expected = [
      [{x: 100, y: 0}, {x: 200, y: 50}],
      [{x: 0, y: 50}, {x: 100, y: 100}]
    ];

    expect(result).toEqual(expected);
  });
});
