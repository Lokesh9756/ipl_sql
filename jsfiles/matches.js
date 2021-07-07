try {
  let data = [];
  let i;
  // To create connection
  const conn = require('../connection.js');
  const teamSearch = require('./teamSearch');
  const umpireSearch = require('./umpireSearch');
  // To read data from file
  if (conn) {
    const fs = require('fs');
    const csvObject = fs.readFileSync('../datafiles/matches.csv');
    try {
      if (csvObject) {
        // convert csv object into string
        const tempArray = csvObject.toString().split('\r');
        data = tempArray[0].split(',');
        for (i = 1; i < tempArray.length; i++) {
          data.push(tempArray[i].split(','));
        }
        for (i = 18; i < data.length - 1; i++) {
          const season = parseInt(data[i][1]);
          const dlApplied = parseInt(data[i][9]);
          const winByRuns = parseInt(data[i][11]);
          const winByWickets = parseInt(data[i][12]);
          // Looped query to insert data into table match table
          const querry = {
            text: 'INSERT INTO matches(id, season, city, date, team1, team2, toss_winner, toss_decision, result, dl_applied, winner, win_by_runs, win_by_wickets, player_of_match, venue, umpire1, umpire2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17 )',
            values: [
              i - 17,
              season,
              data[i][2],
              data[i][3],
              teamSearch(data[i][4]),
              teamSearch(data[i][5]),
              teamSearch(data[i][6]),
              data[i][7],
              data[i][8],
              dlApplied,
              teamSearch(data[i][10]),
              winByRuns,
              winByWickets,
              data[i][13],
              data[i][14],
              umpireSearch(data[i][15]),
              umpireSearch(data[i][16]),
            ],
          };
          // callback
          conn.query(querry, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              // console.log('ddwe');
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
    throw new Error('Error check connection');
  }
} catch (err) {
  console.log(err);
}
