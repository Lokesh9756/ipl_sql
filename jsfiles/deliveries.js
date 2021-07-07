try {
  let Data = [];
  let i;
  // To create connection
  const conn = require('../connection.js');
  const playerSearch = require('./playerSearch');
  const teamSearch = require('./teamSearch');
  // To read data from deliveries.csv file
  if (conn) {
    const fs = require('fs');
    const CsvObject = fs.readFileSync('../datafiles/deliveries.csv');
    try {
      if (CsvObject) {
        // convert csv object into string
        const TempArray = CsvObject.toString().split('\r');
        Data = TempArray[0].split(',');
        for (i = 1; i < TempArray.length; i++) {
          Data.push(TempArray[i].split(','));
        }
        for (i = 22; i < Data.length - 1; i++) {
          const matchId = parseInt(Data[i][0]);
          const inning = parseInt(Data[i][1]);
          const over = parseInt(Data[i][4]);
          const ball = parseInt(Data[i][5]);
          const isSuperOver = parseInt(Data[i][9]);
          const wideRun = parseInt(Data[i][10]);
          const byeRun = parseInt(Data[i][11]);
          const legByeRun = parseInt(Data[i][12]);
          const noBallRun = parseInt(Data[i][13]);
          const peneltyRun = parseInt(Data[i][14]);
          const batsmanRun = parseInt(Data[i][15]);
          const extraRun = parseInt(Data[i][16]);
          const totalRun = parseInt(Data[i][17]);
          const dissmisedKind = Data[i][19];
          // Lopped query to insert data into deliveries table
          const querry = {
            text: 'INSERT INTO deliveries( inning, batting_team, bowling_team, over, ball, batsman, non_stricker, bowler, is_super_over, wide_runs, bye_runs, legbye_runs, no_ball_runs, penelty_runs, batsman_runs, extra_runs, total_runs, player_dissmised, dissmised_kind, fielder, match_id, dv_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22 )',
            values: [
              inning,
              teamSearch(Data[i][2]),
              teamSearch(Data[i][2]),
              over,
              ball,
              playerSearch(Data[i][6]),
              playerSearch(Data[i][8]),
              playerSearch(Data[i][7]),
              isSuperOver,
              wideRun,
              byeRun,
              legByeRun,
              noBallRun,
              peneltyRun,
              batsmanRun,
              extraRun,
              totalRun,
              playerSearch(Data[i][18]),
              dissmisedKind,
              playerSearch(Data[i][20]),
              matchId,
              i - 21,
            ],
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
