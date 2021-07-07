function searchUmpire(name) {
  try {
    // import the function file
    let data = [];
    const umpireArray = [];
    const fs = require('fs');
    // Read the data file using filestream
    const csvObject = fs.readFileSync('../datafiles/matches.csv');
    if (csvObject) {
      // convert object data into string
      const TempStringVariable = csvObject.toString().split('\r');
      data = TempStringVariable[0].split(',');
      for (let i = 1; i < TempStringVariable.length; i++) {
        data.push(TempStringVariable[i].split(','));
      }
      for (let i = 18; i < data.length - 1; i++) {
        if (data[i][2]) {
          if (umpireArray.includes(data[i][15]));
          else {
            umpireArray.push(data[i][15]);
          }
        }
      }
      for (let i = 0; i < umpireArray.length; i++) {
        if (umpireArray[i] === name) return i + 1;
      }
    } else {
      throw new Error('Failed to import file player to search player');
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = searchUmpire;
