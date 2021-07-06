try {
  const conn = require('./connection.js');
  if (conn) {
    const fs = require('fs');
    const CsvObject = fs.readFileSync('./datafiles/matches.csv');
    try {
      if (CsvObject) {
        // convert csv object into string
        const TempArray = CsvObject.toString().split('\r');
        const Data = TempArray[0].split(',');
        for (let i = 1; i < TempArray.length; i++) {
          Data.push(TempArray[i].split(','));
        }
        // Array to store  teams
        var UmpireArray = [];
        for (let i = 18; i < Data.length - 1; i++) {
          if (Data[i][15]) {
            if (UmpireArray.includes(Data[i][15]));
            else {
              UmpireArray.push(Data[i][15]);
            }
          }
        }
      } else {
        throw new Error('error in importing data from csv file');
      }
    } catch (err) {
      console.log(err);
    }
    for (let i = 0; i < UmpireArray.length; i++) {
      const querry = {
        text: 'INSERT INTO umpires(umpire_id, name) VALUES($1, $2)',
        values: [i + 1, UmpireArray[i]],
      };
      // callback
      conn.query(querry, (err, res) => {
        if (err) {
          //  console.log(err.stack);
        } else {
          // console.log(res.rows[0]);
        }
      });
    }
  } else {
    throw new Error('Error check connection');
  }
} catch (err) {
  console.log(err);
}
console.log(UmpireArray);
