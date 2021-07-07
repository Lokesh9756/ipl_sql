try {
  const conn = require('../connection.js');
  const umpireArray = [];
  if (conn) {
    const fs = require('fs');
    const csvObject = fs.readFileSync('./datafiles/matches.csv');
    try {
      if (csvObject) {
        // convert csv object into string
        const tempArray = csvObject.toString().split('\r');
        const data = tempArray[0].split(',');
        for (let i = 1; i < tempArray.length; i++) {
          data.push(tempArray[i].split(','));
        }
        // Array to store  teams

        for (let i = 18; i < data.length - 1; i++) {
          if (data[i][15]) {
            if (umpireArray.includes(data[i][15]));
            else {
              umpireArray.push(data[i][15]);
            }
          }
        }
      } else {
        throw new Error('error in importing data from csv file');
      }
    } catch (err) {
      console.log(err);
    }
    for (let i = 0; i < umpireArray.length; i++) {
      const querry = {
        text: 'INSERT INTO umpires(umpire_id, name) VALUES($1, $2)',
        values: [i + 1, umpireArray[i]],
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
