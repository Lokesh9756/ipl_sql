try {
  // To create connection
  const conn = require('./connection.js');
  if (conn) {
    // To read data from file
    const fs = require('fs');
    const CsvObject = fs.readFileSync('../datafiles/matches.csv');
    try {
      if (CsvObject) {
        // convert csv object into string
        const TempArray = CsvObject.toString().split('\r');
        const Data = TempArray[0].split(',');
        for (let i = 1; i < TempArray.length; i++) {
          Data.push(TempArray[i].split(','));
        }
        // Array to store  teams
        var TeamArray = [];
        for (let i = 18; i < Data.length - 1; i++) {
          if (Data[i][10]) {
            if (TeamArray.includes(Data[i][10]));
            else {
              TeamArray.push(Data[i][10]);
            }
          }
        }
      } else {
        throw new Error('error in importing data from csv file');
      }
    } catch (err) {
      console.log(err);
    }
    // Looped query to insert data into table team
    for (let i = 0; i < TeamArray.length; i++) {
      const querry = {
        text: 'INSERT INTO teams(team_id, name) VALUES($1, $2)',
        values: [i + 1, TeamArray[i]],
      };
      // callback
      conn.query(querry, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          // conn.end();
        }
      });
    }
  } else {
    throw new Error('Error check connection');
  }
} catch (err) {
  console.log(err);
}
