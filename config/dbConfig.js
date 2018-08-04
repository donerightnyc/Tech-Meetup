// let pg-promise know how to connect to db
module.exports = process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  database: 'events_db'
}