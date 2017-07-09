import { formatSolarIrradiance } from './solar-output.js';

describe('formatSolarIrradiance', () => {
  it('it outputs properly formatted data', () => {
    let data = [
      {"YYYY-MM-DD": "2010-01-05", "HH:MM (LST)": "1:00", "Zenith (deg)": "99.0", "ETR (Wh/m^2)": "0", "_": "_"},
      {"YYYY-MM-DD": "2010-01-05", "HH:MM (LST)": "11:00", "Zenith (deg)": "99.0", "ETR (Wh/m^2)": "100", "_": "_"},
      {"YYYY-MM-DD": "2010-01-06", "HH:MM (LST)": "1:00", "Zenith (deg)": "99.0", "ETR (Wh/m^2)": "0", "_": "_"}
    ];

    let output = [
      {"date": "2010-01-05 01:00", "zenith": "99.0", "value": "0"},
      {"date": "2010-01-05 11:00", "zenith": "99.0", "value": "100"}
    ];

    expect(formatSolarIrradiance(data, "2010-01-05")).toEqual(output);
  });
});
