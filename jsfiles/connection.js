try {
  const { Client } = require('pg');

  const connection = new Client({
    user: 'postgres',
    password: 'pal12345',
    host: 'localhost',
    port: 5432,
    database: 'ipl_database',
  });
  if (connection) {
    connection
      .connect()
      .then(() => console.log('connected successfully'))
      .catch((e) => console.log(e));
    module.exports = connection;
  } else {
    throw new Error('Error something gone wrong please check your connection');
  }
} catch (er) {
  console.log(er);
}
