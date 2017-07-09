export function formatSolarIrradiance (array, date) {
  return filterByDate(array, date)

  .then(csv => filterByDate(date, csv))
  .then(csv => csv.map(row => {
    return {
      date: formatDateField(row),
      value: row["ETR (Wh/m^2)"]
    }
  }));
}

function formatTime (string) {
  return /^\d{2}:/.test(string) ? string : '0' + string;
}

function parseTime (string) {
  const timeParser = d3.timeParse('%Y-%m-%d %H:%M')
  return timeParser(string)
}

function combineDate (date, time) {
  return date + ' ' + time;
}

function formatDateField (row) {
  //return parseTime(combineDate(row["YYYY-MM-DD"], formatTime(row['HH:MM (LST)'])));
  return combineDate(row["YYYY-MM-DD"], formatTime(row['HH:MM (LST)']));
}

function filterByDate (array, date) {
  const re = new RegExp(date);
  return array.filter(row => re.test(row["YYYY-MM-DD"]));
}
