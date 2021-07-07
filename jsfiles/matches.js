try {
  const TeamArray = [];
  const UmpireArray = [];
  let Data = [];
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
        Data = TempArray[0].split(',');
        for (i = 1; i < TempArray.length; i++) {
          Data.push(TempArray[i].split(','));
        }
        // Array to store  teams

        for (i = 18; i < Data.length - 1; i++) {
          if (Data[i][10]) {
            if (TeamArray.includes(Data[i][10]));
            else {
              TeamArray.push(Data[i][10]);
            }
          }
        }
        // Array to store Umpire
        for (i = 18; i < Data.length - 1; i++) {
          if (Data[i][15]) {
            if (UmpireArray.includes(Data[i][15]));
            else {
              UmpireArray.push(Data[i][15]);
            }
          }
        }
        let Team1;
        let Team2;
        let TossWinner;
        let Winner;
        let Umpire1;
        let Umpire2;

        for (i = 18; i < Data.length - 1; i++) {
          const season = parseInt(Data[i][1]);
          const DlApplied = parseInt(Data[i][9]);
          const WinByRuns = parseInt(Data[i][11]);
          const WinByWickets = parseInt(Data[i][12]);
          for (j = 0; j < TeamArray.length - 1; j++) {
            if (TeamArray[j] === Data[i][4]) {
              Team1 = j + 1;
            }
            if (TeamArray[j] === Data[i][5]) {
              Team2 = j + 1;
            }
            if (TeamArray[j] === Data[i][6]) {
              TossWinner = j + 1;
            }
            if (TeamArray[j] === Data[i][10]) {
              Winner = j + 1;
            }
          }
          for (j = 0; j < UmpireArray.length - 1; j++) {
            if (UmpireArray[j] === Data[i][15]) {
              Umpire1 = j + 1;
            }
            if (UmpireArray[j] === Data[i][16]) {
              Umpire2 = j + 1;
            }
          }
          // Looped query to insert data into table match table
          const querry = {
            text: 'INSERT INTO matches(id, season, city, date, team1, team2, toss_winner, toss_decision, result, dl_applied, winner, win_by_runs, win_by_wickets, player_of_match, venue, umpire1, umpire2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17 )',
            values: [
              i - 17,
              season,
              Data[i][2],
              Data[i][3],
              Team1,
              Team2,
              TossWinner,
              Data[i][7],
              Data[i][8],
              DlApplied,
              Winner,
              WinByRuns,
              WinByWickets,
              Data[i][13],
              Data[i][14],
              Umpire1,
              Umpire2,
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
