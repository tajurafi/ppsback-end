const connection = require('../config/database');

exports.insert = (stok_gudang_id, bantuan_sosial_id, callback) => {
    const querySql = `INSERT INTO bantuan_sosial_details (stok_gudang_id, bantuan_sosial_id) VALUES (?, ?)`;
    connection.query(querySql, [stok_gudang_id, bantuan_sosial_id], callback);
};