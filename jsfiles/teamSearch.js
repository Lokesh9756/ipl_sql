function searchTeam(name) {
  try {
    // import the function file
    let Data = [];
    const teamArray = [];
    const fs = require('fs');
    // Read the data file using filestream
    const CsvObject = fs.readFileSync('../datafiles/deliveries.csv');
    if (CsvObject) {
      // convert object data into string
      const TempStringVariable = CsvObject.toString().split('\r');
      Data = TempStringVariable[0].split(',');
      for (let i = 1; i < TempStringVariable.length; i++) {
        Data.push(TempStringVariable[i].split(','));
      }
      for (let i = 18; i < Data.length - 1; i++) {
        if (Data[i][2]) {
          if (teamArray.includes(Data[i][2]));
          else {
            teamArray.push(Data[i][2]);
          }
        }
      }
      for (let i = 0; i < teamArray.length; i++) {
        if (teamArray[i] === name) return i + 1;
      }
    } else {
      throw new Error('Failed to import file player to search player');
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = searchTeam;
