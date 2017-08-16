const db = require('../../src/db/db.js')

const resetDB = (tables) => {

  return tables.map((table) => {
    db.none(`TRUNCATE table ${table} RESTART IDENTITY`);
  })
}

module.exports = {resetDB}
