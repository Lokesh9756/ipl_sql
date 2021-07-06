const fs = require('fs');
const conn = require('./jsfiles/connection.js');

conn.query(
  'select season,count(season) as NoOfYear from matches group by season order by season',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('NUmber of matches played per year:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/MatchesPlayedPerYear.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 59 and 118 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2008 :');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2008.json', data);
    }
  }
);

conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 117 and 175 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2009:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2009.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 174 and 235 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2010:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2010.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 234 and 308 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2011:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2011.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 307 and 382 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2012:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2012.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 381 and 458 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2013:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2013.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 457 and 518 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2014:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2014.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 517 and 577 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2015:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2015.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 576 and 637 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2016:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2016.json', data);
    }
  }
);
conn.query(
  'select tm.name,count(mc.winner) as TotalNo from matches mc inner join teams tm on tm.team_id=mc.winner where mc.id between 0 and 60 group by tm.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of number of winner per team in 2017:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/WinnerTeamCount2017.json', data);
    }
  }
);
conn.query(
  'select pl.name,count(dv.extra_runs) as ExtraRun from deliveries dv inner join players pl on pl.player_id=dv.batsman  where dv.match_id between 576 and 636 group by pl.name',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('count of Extrarun of player in year 2016:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/PlayerExtraRunCount2016.json', data);
    }
  }
);
conn.query(
  'SELECT pl.name AS "Player", round((sum(dv.total_runs - dv.bye_runs - dv.legbye_runs)*6.0::decimal/ count(dv.ball) ),2) AS "Economy"from deliveries dv inner join players pl on pl.player_id=dv.bowler where dv.match_id between 517 and 577 group by pl.name order by round((sum(dv.total_runs - dv.bye_runs - dv.legbye_runs)*6.0::decimal/ count(dv.ball) ),2) limit 10 ',
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('Top 10 economical bowler of 2015:');
      console.table(res.rows);
      const data = JSON.stringify(res.rows);
      fs.writeFileSync('./output/Top10EconomicalBowler2015.json', data);
      conn.end();
    }
  }
);
