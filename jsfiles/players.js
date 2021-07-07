try {
  const conn = require('../connection.js');
  if (conn) {
    try {
      // import the function file
      let Data = [];
      const PlayersArray = [];
      const fs = require('fs');
      // Read the data file using filestream
      const CsvObject = fs.readFileSync('./datafiles/deliveries.csv');
      if (CsvObject) {
        // convert object data into string
        const TempStringVariable = CsvObject.toString().split('\r');
        Data = TempStringVariable[0].split(',');
        for (let i = 1; i < TempStringVariable.length; i++) {
          Data.push(TempStringVariable[i].split(','));
        }
        for (let i = 22; i < Data.length - 1; i++) {
          if (Data[i][6]) {
            if (PlayersArray.includes(Data[i][6]));
            else {
              PlayersArray.push(Data[i][6]);
            }
          }
        }
        for (let i = 0; i < PlayersArray.length; i++) {
          const querry = {
            text: 'INSERT INTO players(player_id, name) VALUES($1, $2)',
            values: [i + 1, PlayersArray[i]],
          };
          // callback
          conn.query(querry, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              // console.log(res.rows[0]);
            }
          });
        }
      } else {
        throw new Error('error in importing data from csv file');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    throw new Error('Error somthing gone wrong check connection');
  }
} catch (err) {
  console.log(err);
}
