const textures = {
  network: require('../assets/network.png'),
  gasification: require('../assets/gasification.png'),
  solar: require('../assets/solar.png'),
  temple: require('../assets/temple.png'),
  factory: require('../assets/factory.png'),
  house: require('../assets/house.png')
};

export const temple = {
  name: 'temple',
  src: textures.temple,
  width: 1,
  height: 2,
  offsetHeight: 1,
  type: 'consumer'
};

export const factory = {
  name: 'factory',
  src: textures.factory,
  width: 1,
  height: 2,
  offsetHeight: 1,
  type: 'consumer'
};

export const solar = {
  name: 'solar',
  src: textures.solar,
  width: 1,
  height: 2,
  offsetHeight: 1,
  type: 'generator'
};

export const gasification = {
  name: 'gasification',
  src: textures.gasification,
  width: 1,
  height: 2,
  offsetHeight: 1,
  type: 'generator'
};

export const house = {
  name: 'house',
  src: textures.house,
  width: 1,
  height: 2,
  offsetHeight: 1,
  type: 'consumer'
};

export const network = {
  name: 'network',
  src: textures.network,
  width: 1,
  height: 2,
  offsetHeight: 1,
  type: 'distributor'
};
