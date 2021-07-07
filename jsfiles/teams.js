try {
  // To create connection
  const conn = require('./connection.js');
  const teamArray = [];
  if (conn) {
    // To read data from file
    const fs = require('fs');
    const csvObject = fs.readFileSync('../datafiles/matches.csv');
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
          if (data[i][10]) {
            if (teamArray.includes(data[i][10]));
            else {
              teamArray.push(data[i][10]);
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
    for (let i = 0; i < teamArray.length; i++) {
      const querry = {
        text: 'INSERT INTO teams(team_id, name) VALUES($1, $2)',
        values: [i + 1, teamArray[i]],
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
