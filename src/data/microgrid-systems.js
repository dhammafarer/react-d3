import { createSystem } from '../helpers/system-factory.js';
import { grass, stone } from './terrain-tiles.js';
import { temple, solar, house, factory } from './building-tiles.js';

export const fushan =  createSystem({
  name: 'Fushan Microgrid',
  gridSize: [4, 4],
  terrainMap: [
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [stone, stone, grass, grass]
  ],
  buildings: [
    {tile: temple, data: null, pos: [0, 2]},
    {tile: solar, data: null, pos: [1, 0]},
    {tile: factory, data: null, pos: [3, 1]},
    {tile: house, data: null, pos: [3, 3]}
  ]
});

export const qimei = createSystem({
  name: 'Qimei Microgrid',
  gridSize: [3, 3],
  terrainMap: [
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, grass, grass]
  ],
  buildings: [
    {tile: temple, data: null, pos: [0, 2]},
    {tile: solar, data: null, pos: [1, 0]},
    {tile: house, data: null, pos: [2,2]}
  ]
});

