const pg = require('pg');
const config = {
  user: 'postgres',
  database: 'university',
  password: 'my_postgres_password',
  max: 10,
  idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

module.exports = pool;