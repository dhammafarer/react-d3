const textures = {
  grass: require('../assets/grass.png'),
  dirt: require('../assets/dirt.png'),
  sand: require('../assets/sand.png'),
  water: require('../assets/water.png'),
  stone: require('../assets/stone.png')
};

const defaultWidth = 1;
const defaultHeight = 1.5;
const defaultOffset = 0;

export const grass = createTerrain({
  name: 'grass',
  src: textures.grass,
});

export const dirt = createTerrain({
  name: 'dirt',
  src: textures.dirt,
});

export const water = createTerrain({
  name: 'water',
  src: textures.water,
});

export const sand = createTerrain({
  name: 'sand',
  src: textures.sand,
});

export const stone = createTerrain({
  name: 'stone',
  src: textures.stone,
});

function createTerrain ({name, src, width = defaultWidth, height = defaultHeight, offsetHeight = defaultOffset}) {
  return {
    name,
    src,
    width,
    height,
    offsetHeight
  };
}
