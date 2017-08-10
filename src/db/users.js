const db = require('./db')

const createUser = function (user) {
  return db.query(`
    INSERT INTO
      users (username, pass_hash)
    VALUES
      ($1::text, $2::text)
    `,
    [
      user.newUsername,
      user.passHash
    ])
    .catch(error => error);
}

const getUser = function (user) {
  return db.one(`
    SELECT
      username, pass_hash, role
    FROM
      users
    WHERE
      username=$1
    `,
    [
      user.username,
    ])
    .catch(error => error);
}



module.exports = {
  createUser,
  getUser
}
