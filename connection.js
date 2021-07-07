try {
  const { Client } = require('pg');
  require('dotenv').config();
  const connection = new Client({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: parseInt(process.env.user),
    database: process.env.database,
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
