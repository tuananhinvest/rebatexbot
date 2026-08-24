const pool = require('./connection');
const users = require('./users');

module.exports = {
  pool,
  ...users,
};