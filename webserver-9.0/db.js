// moduł serwuje danymi z bazy danych
// -------------------------------------
const mysql = require('mysql')

let con

let appConfig
const setConfig = function (value) {
  appConfig = value
}

const send200 = function (response) {
  response.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8'
  })
}

const insertCustomer = function (name, address) {
  const sql = "INSERT INTO customers (name, address) VALUES ('" + name + "', '" + address + "')"
  con.query(sql, function (err) {
    if (err) throw err
    console.log('1 record inserted')
  })
}

const initDB = function (con) {
  console.log('Preparing database.')
  con.query('CREATE DATABASE IF NOT EXISTS testdb ', function (err) {
    if (err) throw err
    console.log('Database created')

    const sql = 'USE testdb'
    con.query(sql, function (err) {
      if (err) throw err
      console.log('DB selected')

      const sql = 'DROP TABLE IF EXISTS customers'
      con.query(sql, function (err) {
        if (err) throw err
        console.log('Table dropped')

        const sql = 'CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255)) '
        con.query(sql, function (err) {
          if (err) throw err
          console.log('Table created')
          insertCustomer('IBM', 'First Way Drive, Santa Ana, USA')
          insertCustomer('MSZ', 'Polonijna 12, Warszawa, Polska')
        })
      })
    })
  })
}

const init = function () {
  con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Passw0rd1234'
  })

  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    initDB(con)
  })
}

const getCust = function (response) {
  console.log(`getCust`)
  con.query('SELECT * FROM customers' , function (err, result) {
  if (err) throw err
    console.log(result)

  send200(response)
  response.write('Database dump:')
  response.write(JSON.stringify(result))
  response.end()
  })
}

module.exports = {
  init: init,
  getCust: getCust
}
