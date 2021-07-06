try {
  const TeamArray = [];
  const PlayersArray = [];
  let Data = [];
  let i;
  let j;
  // To create connection
  const conn = require('./connection.js');
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
        // Array to store  teams

        for (i = 21; i < Data.length - 1; i++) {
          if (Data[i][2]) {
            if (TeamArray.includes(Data[i][2]));
            else {
              TeamArray.push(Data[i][2]);
            }
          }
        }
        // Array to store player
        for (i = 21; i < Data.length - 1; i++) {
          if (Data[i][6]) {
            if (PlayersArray.includes(Data[i][6]));
            else {
              PlayersArray.push(Data[i][6]);
            }
          }
        }
        let Fielder;

        let PlayerDissmised;
        let Bowler;
        let NonStricker;
        let Batsman;
        let BowlingTeam;
        let BattingTeam;
        for (i = 22; i < Data.length - 1; i++) {
          const MatchId = parseInt(Data[i][0]);
          const Inning = parseInt(Data[i][1]);
          const Over = parseInt(Data[i][4]);
          const Ball = parseInt(Data[i][5]);
          const IsSuperOver = parseInt(Data[i][9]);
          const WideRun = parseInt(Data[i][10]);
          const ByeRun = parseInt(Data[i][11]);
          const LegByeRun = parseInt(Data[i][12]);
          const NoBallRun = parseInt(Data[i][13]);
          const PeneltyRun = parseInt(Data[i][14]);
          const BatsmanRun = parseInt(Data[i][15]);
          const ExtraRun = parseInt(Data[i][16]);
          const TotalRun = parseInt(Data[i][17]);
          const DissmisedKind = Data[i][19];
          for (j = 0; j < TeamArray.length - 1; j++) {
            if (TeamArray[j] === Data[i][2]) {
              BattingTeam = j + 1;
            }
            if (TeamArray[j] === Data[i][3]) {
              BowlingTeam = j + 1;
            }
          }
          for (j = 0; j < PlayersArray.length - 1; j++) {
            if (PlayersArray[j] === Data[i][6]) {
              Batsman = j + 1;
            }
            if (PlayersArray[j] === Data[i][8]) {
              NonStricker = j + 1;
            }
            if (PlayersArray[j] === Data[i][7]) {
              Bowler = j + 1;
            }
            if (PlayersArray[j] === Data[i][18]) {
              PlayerDissmised = j + 1;
            }
            if (PlayersArray[j] === Data[i][20]) {
              Fielder = j + 1;
            }
          }
          // Lopped query to insert data into deliveries table
          const querry = {
            text: 'INSERT INTO deliveries( inning, batting_team, bowling_team, over, ball, batsman, non_stricker, bowler, is_super_over, wide_runs, bye_runs, legbye_runs, no_ball_runs, penelty_runs, batsman_runs, extra_runs, total_runs, player_dissmised, dissmised_kind, fielder, match_id, dv_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22 )',
            values: [
              Inning,
              BattingTeam,
              BowlingTeam,
              Over,
              Ball,
              Batsman,
              NonStricker,
              Bowler,
              IsSuperOver,
              WideRun,
              ByeRun,
              LegByeRun,
              NoBallRun,
              PeneltyRun,
              BatsmanRun,
              ExtraRun,
              TotalRun,
              PlayerDissmised,
              DissmisedKind,
              Fielder,
              MatchId,
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
