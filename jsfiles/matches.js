try {
  const teamArray = [];
  const umpireArray = [];
  let data = [];
  let i;
  let j;
  // To create connection
  const conn = require('../connection.js');
  // To read data from file
  if (conn) {
    const fs = require('fs');
    const CsvObject = fs.readFileSync('../datafiles/matches.csv');
    try {
      if (CsvObject) {
        // convert csv object into string
        const TempArray = CsvObject.toString().split('\r');
        data = teamArray[0].split(',');
        for (i = 1; i < TempArray.length; i++) {
          data.push(TempArray[i].split(','));
        }
        // Array to store  teams

        for (i = 18; i < data.length - 1; i++) {
          if (data[i][10]) {
            if (teamArray.includes(data[i][10]));
            else {
              teamArray.push(data[i][10]);
            }
          }
        }
        // Array to store Umpire
        for (i = 18; i < data.length - 1; i++) {
          if (data[i][15]) {
            if (umpireArray.includes(data[i][15]));
            else {
              umpireArray.push(data[i][15]);
            }
          }
        }
        let team1;
        let team2;
        let tossWinner;
        let winner;
        let umpire1;
        let umpire2;

        for (i = 18; i < data.length - 1; i++) {
          const season = parseInt(data[i][1]);
          const DlApplied = parseInt(data[i][9]);
          const WinByRuns = parseInt(data[i][11]);
          const WinByWickets = parseInt(data[i][12]);
          for (j = 0; j < teamArray.length - 1; j++) {
            if (teamArray[j] === data[i][4]) {
              team1 = j + 1;
            }
            if (teamArray[j] === data[i][5]) {
              team2 = j + 1;
            }
            if (teamArray[j] === data[i][6]) {
              tossWinner = j + 1;
            }
            if (teamArray[j] === data[i][10]) {
              winner = j + 1;
            }
          }
          for (j = 0; j < umpireArray.length - 1; j++) {
            if (umpireArray[j] === data[i][15]) {
              umpire1 = j + 1;
            }
            if (umpireArray[j] === data[i][16]) {
              umpire2 = j + 1;
            }
          }
          // Looped query to insert data into table match table
          const querry = {
            text: 'INSERT INTO matches(id, season, city, date, team1, team2, toss_winner, toss_decision, result, dl_applied, winner, win_by_runs, win_by_wickets, player_of_match, venue, umpire1, umpire2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17 )',
            values: [
              i - 17,
              season,
              data[i][2],
              data[i][3],
              team1,
              team2,
              tossWinner,
              data[i][7],
              data[i][8],
              DlApplied,
              winner,
              WinByRuns,
              WinByWickets,
              data[i][13],
              data[i][14],
              umpire1,
              umpire2,
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
