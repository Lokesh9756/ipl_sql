function searchPlayer(name) {
  try {
    // import the function file
    let data = [];
    const playersArray = [];
    const fs = require('fs');
    // Read the data file using filestream
    const csvObject = fs.readFileSync('../datafiles/deliveries.csv');
    if (csvObject) {
      // convert object data into string
      const tempStringVariable = CsvObject.toString().split('\r');
      data = tempStringVariable[0].split(',');
      for (let i = 1; i < tempStringVariable.length; i++) {
        data.push(tempStringVariable[i].split(','));
      }
      for (let i = 22; i < data.length - 1; i++) {
        if (data[i][6]) {
          if (playersArray.includes(data[i][6]));
          else {
            playersArray.push(data[i][6]);
          }
        }
      }
      for (let i = 0; i < playersArray.length; i++) {
        if (playersArray[i] === name) return i + 1;
      }
    } else {
      throw new Error('Failed to import file player to search player');
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = searchPlayer;
