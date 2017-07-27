import { createSystem } from '../helpers/system-factory.js';
import { grass, stone } from './terrain-textures.js';
import { network, gasification, temple, solar, house, factory } from './building-textures.js';

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
    {name: 'Gasification', texture: gasification, data: {active: true}, pos: [1, 0]},
    {name: 'PV Farm', texture: solar, data: {active: true}, pos: [0, 1]},
    {name: 'Power Grid', texture: network, data: {active: true}, pos: [2, 2]},
    {name: 'Temple', texture: temple, data: {active: true}, pos: [0, 3]},
    {name: 'Factory', texture: factory, data: {active: true}, pos: [3, 0]},
    {name: 'House', texture: house, data: {active: true}, pos: [3, 3]}
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
    {name: 'Power Grid', texture: network, data: {active: true}, pos: [1, 1]},
    {name: 'Temple', texture: temple, data: {active: true}, pos: [0, 2]},
    {name: 'PV Farm', texture: solar, data: {active: true}, pos: [1, 0]},
    {name: 'House', texture: house, data: {active: true}, pos: [2,2]}
  ]
});

