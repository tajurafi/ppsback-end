const mysql = require('mysql');

// buat konfigurasi connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pps_db',
    multipleStatements: true
});

// connection database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = connection;
