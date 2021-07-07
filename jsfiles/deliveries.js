try {
  let data = [];
  let i;
  // To create connection
  const conn = require('../connection.js');
  const playerSearch = require('./playerSearch');
  const teamSearch = require('./teamSearch');
  // To read data from deliveries.csv file
  if (conn) {
    const fs = require('fs');
    const csvObject = fs.readFileSync('../datafiles/deliveries.csv');
    try {
      if (csvObject) {
        // convert csv object into string
        const TempArray = csvObject.toString().split('\r');
        data = TempArray[0].split(',');
        for (i = 1; i < TempArray.length; i++) {
          data.push(TempArray[i].split(','));
        }
        for (i = 22; i < data.length - 1; i++) {
          const matchId = parseInt(data[i][0]);
          const inning = parseInt(data[i][1]);
          const over = parseInt(data[i][4]);
          const ball = parseInt(data[i][5]);
          const isSuperOver = parseInt(data[i][9]);
          const wideRun = parseInt(data[i][10]);
          const byeRun = parseInt(data[i][11]);
          const legByeRun = parseInt(data[i][12]);
          const noBallRun = parseInt(data[i][13]);
          const peneltyRun = parseInt(data[i][14]);
          const batsmanRun = parseInt(data[i][15]);
          const extraRun = parseInt(data[i][16]);
          const totalRun = parseInt(data[i][17]);
          const dissmisedKind = data[i][19];
          // Lopped query to insert data into deliveries table
          const querry = {
            text: 'INSERT INTO deliveries( inning, batting_team, bowling_team, over, ball, batsman, non_stricker, bowler, is_super_over, wide_runs, bye_runs, legbye_runs, no_ball_runs, penelty_runs, batsman_runs, extra_runs, total_runs, player_dissmised, dissmised_kind, fielder, match_id, dv_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22 )',
            values: [
              inning,
              teamSearch(data[i][2]),
              teamSearch(data[i][2]),
              over,
              ball,
              playerSearch(data[i][6]),
              playerSearch(data[i][8]),
              playerSearch(data[i][7]),
              isSuperOver,
              wideRun,
              byeRun,
              legByeRun,
              noBallRun,
              peneltyRun,
              batsmanRun,
              extraRun,
              totalRun,
              playerSearch(data[i][18]),
              dissmisedKind,
              playerSearch(data[i][20]),
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
