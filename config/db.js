const { Pool }=require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    password: '1234',
    user: 'postgres',
    database: 'gul'
})

module.exports = pool