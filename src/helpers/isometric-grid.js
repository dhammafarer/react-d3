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

export function mapToIso (isotable, tile, objectsMap) {
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

export function arrayToIso (isotable, tile, array) {
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

export function tilePolygons (isotable, tile) {
  let {width, height} = tile;
  return isotable.map((row, y) => row
    .map((coords, x) => {
      return {
        points: isometricTilePolygonPoints([width, height], coords),
        pos: [y, x]};
    }))
    .reduce((a,b) => a.concat(b), []);
}

function isometricTilePolygonPoints ([width, height], {x, y}) {
  return [
    [x + width / 2, y],
    [x + width, y + height / 2],
    [x + width / 2, y + height],
    [x, y + height / 2]
  ].join(' ');
}
