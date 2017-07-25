const DEFAULT_GRID = [3, 3];
const DEFAULT_TERRAIN = createGrid(DEFAULT_GRID);
const DEFAULT_BUILDINGS = [];

export function createSystem ({name, gridSize = DEFAULT_GRID, terrainMap = DEFAULT_TERRAIN, buildings = DEFAULT_BUILDINGS}) {
  return {
    name,
    gridSize,
    terrainMap,
    buildings
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
