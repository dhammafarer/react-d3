const DEFAULT_GRID = [3, 3];
const DEFAULT_TERRAIN = createGrid(DEFAULT_GRID);
const DEFAULT_BUILDINGS = createGrid(DEFAULT_GRID);

export function createSystem ({name, gridSize = DEFAULT_GRID, terrainMap = DEFAULT_TERRAIN, buildingsMap = DEFAULT_BUILDINGS}) {
  return {
    name,
    gridSize,
    terrainMap,
    buildingsMap
  };
}

function createGrid ([y, x], val = null) {
  const res = [];

  for (let i=0; i < y; i++) {
    res[i] = [];
    for (let j=0; j < x; j++) {
      res[i][j] = val;
    }
  }

  return res;
}
