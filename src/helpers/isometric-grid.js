export function getIsometricTileCoords (gridSize, tileSize) {
  return Array.apply(null, Array(gridSize[1]))
    .map(() => Array.apply(null, Array(gridSize[0])))
    .map((row, i) => row
      .map((el, j) => {
        return {
          x: (tileSize[0] / 2) * (gridSize[1] - 1 - i + j),
          y: (tileSize[1] / 2) * (i + j)
        };
      })
    );
}
