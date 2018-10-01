// TODO - where did pg come from;
const pg = require('pg');
const config = {
  user: 'gauravsharma',
  database: 'university',
  max: 10,
  idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

module.exports = pool;