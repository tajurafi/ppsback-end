const connection = require('../config/database');

exports.create = (data, callback) => {
    const querySql = 'INSERT INTO penerima_bantuan SET ?';
    connection.query(querySql, data, callback);
};

exports.getAll = (callback) => {
    const querySql = 'SELECT * FROM penerima_bantuan';
    connection.query(querySql, callback);
};

exports.getByNik = (nik, callback) => {
    const querySql = 'SELECT * FROM penerima_bantuan WHERE nik = ?';
    connection.query(querySql, nik, callback);
};

exports.update = (nik, data, callback) => {
    const querySql = 'UPDATE penerima_bantuan SET ? WHERE nik = ?';
    connection.query(querySql, [data, nik], callback);
};

exports.delete = (nik, callback) => {
    const querySql = 'DELETE FROM penerima_bantuan WHERE nik = ?';
    connection.query(querySql, nik, callback);
};

exports.search = (term, callback) => {
    const querySql = 'SELECT * FROM penerima_bantuan WHERE nama LIKE ? OR nik LIKE ?';
    const searchTerm = `%${term}%`;
    connection.query(querySql, [searchTerm, searchTerm], callback);
};
