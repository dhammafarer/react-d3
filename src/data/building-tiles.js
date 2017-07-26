const tiles = {
  network: require('../assets/network.png'),
  gasification: require('../assets/gasification.png'),
  solar: require('../assets/solar.png'),
  temple: require('../assets/temple.png'),
  factory: require('../assets/factory.png'),
  house: require('../assets/house.png')
};

export const temple = {
  name: 'temple',
  src: tiles.temple,
  height: 2,
  type: 'consumer'
};

export const factory = {
  name: 'factory',
  src: tiles.factory,
  height: 2,
  type: 'consumer'
};

export const solar = {
  name: 'solar',
  src: tiles.solar,
  height: 2,
  type: 'generator'
};

export const gasification = {
  name: 'gasification',
  src: tiles.gasification,
  height: 2,
  type: 'generator'
};

export const house = {
  name: 'house',
  src: tiles.house,
  height: 2,
  type: 'consumer'
};

export const network = {
  name: 'network',
  src: tiles.network,
  height: 2,
  type: 'distributor'
};
