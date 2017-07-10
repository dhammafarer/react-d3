import { formatSolarIrradiance } from './solar-output.js';
import * as d3 from 'd3';

describe('formatSolarIrradiance', () => {
  it('it outputs properly formatted data', () => {
    const timeParse = d3.timeParse('%Y-%m-%d %H:%M');

    let data = [
      {"YYYY-MM-DD": "2010-01-05", "HH:MM (LST)": "1:00", "Zenith (deg)": "99.0", "ETR (Wh/m^2)": "0", "_": "_"},
      {"YYYY-MM-DD": "2010-01-05", "HH:MM (LST)": "11:00", "Zenith (deg)": "99.0", "ETR (Wh/m^2)": "100", "_": "_"},
      {"YYYY-MM-DD": "2010-01-06", "HH:MM (LST)": "1:00", "Zenith (deg)": "99.0", "ETR (Wh/m^2)": "0", "_": "_"}
    ];

    let output = [
      {"date": timeParse("2010-01-05 01:00"), "zenith": "99.0", "value": "0"},
      {"date": timeParse("2010-01-05 11:00"), "zenith": "99.0", "value": "100"}
    ];

    expect(formatSolarIrradiance(data, "2010-01-05")).toEqual(output);
  });
});
