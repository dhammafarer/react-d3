import { createSystem } from '../helpers/system-factory.js';
import { grass, stone } from './terrain-tiles.js';
import { temple, solar, house, factory } from './building-tiles.js';

export const fushan =  createSystem({
  id: 'fushan',
  gridSize: [4, 4],
  terrainMap: [
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [stone, stone, grass, grass]
  ],
  buildingsMap: [
    [null, temple, null, null],
    [house, null, null, house],
    [null, null, solar, null],
    [null, factory, null, null]
  ]
});

export const qimei = createSystem({
  id: 'qimei'
});
