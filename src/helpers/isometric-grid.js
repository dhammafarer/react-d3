export function isometricTileCoords ([rows, cols], [tileWidth, tileHeight]) {
  return Array.apply(null, Array(cols))
    .map(() => Array.apply(null, Array(rows)))
    .map((row, i) => row
      .map((el, j) => {
        return {
          x: (tileWidth / 2) * (cols - 1 - i + j),
          y: (tileHeight / 2) * (i + j)
        };
      })
    );
}

export function isometricTilePolygonPoints ([width, height], {x, y}) {
  return [
    [x + width / 2, y],
    [x + width, y + height / 2],
    [x + width / 2, y + height],
    [x, y + height / 2]
  ].join(' ');
}
