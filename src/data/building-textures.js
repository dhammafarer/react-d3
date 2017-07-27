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
  offsetHeight: 1,
  type: 'consumer'
};

export const factory = {
  name: 'factory',
  src: textures.factory,
  offsetHeight: 1,
  type: 'consumer'
};

export const solar = {
  name: 'solar',
  src: textures.solar,
  offsetHeight: 1,
  type: 'generator'
};

export const gasification = {
  name: 'gasification',
  src: textures.gasification,
  offsetHeight: 1,
  type: 'generator'
};

export const house = {
  name: 'house',
  src: textures.house,
  offsetHeight: 1,
  type: 'consumer'
};

export const network = {
  name: 'network',
  src: textures.network,
  offsetHeight: 1,
  type: 'distributor'
};
