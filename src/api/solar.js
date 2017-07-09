import * as d3 from 'd3';
import { formatSolarIrradiance } from '../helpers/solar-output.js';
const data = require('../data/solar.csv');

export function getSolarIrradiance (date) {
  return fetch(data)
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(array => formatSolarIrradiance(array, date));
};
