try {
  const conn = require('../connection.js');
  if (conn) {
    try {
      // import the function file
      let data = [];
      const playersArray = [];
      const fs = require('fs');
      // Read the data file using filestream
      const csvObject = fs.readFileSync('./datafiles/deliveries.csv');
      if (csvObject) {
        // convert object data into string
        const TempStringVariable = csvObject.toString().split('\r');
        data = TempStringVariable[0].split(',');
        for (let i = 1; i < TempStringVariable.length; i++) {
          data.push(TempStringVariable[i].split(','));
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
          const querry = {
            text: 'INSERT INTO players(player_id, name) VALUES($1, $2)',
            values: [i + 1, playersArray[i]],
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
