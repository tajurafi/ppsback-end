const connection = require('../config/database');

exports.insert = (id,callback) => {
    const querySql = `INSERT INTO bantuan_sosial (penerima_bantuan_id, status)
    VALUES (?, 'AWAITING_APPROVAL')`;
    connection.query(querySql, [id], callback);
};

exports.lastInsertID = (callback) => {
    const querySql = `SELECT LAST_INSERT_ID()`
    connection.query(querySql, callback);
};

exports.getList = (keyword, callback) => {
    const baseQuery = `
    SELECT 
        bs.id, 
        pb.nik, 
        pb.nama, 
        bs.status 
    FROM 
        bantuan_sosial AS bs 
    JOIN 
        bantuan_sosial_details as bsd on bs.id = bsd.bantuan_sosial_id 
    JOIN 
        penerima_bantuan as pb on pb.id = bs.penerima_bantuan_id`;

    const condition = keyword !== "" 
        ? ` WHERE LOWER(pb.nama) LIKE ? OR pb.nik LIKE ?`
        : '';

    const grouping = ` GROUP BY pb.id`;

    const finalQuery = baseQuery + condition + grouping;

    const queryParams = keyword !== "" ? [`%${keyword}%`, `%${keyword}%`] : [];

    connection.query(finalQuery, queryParams, callback);
};


exports.updateStatusApprove = (id, callback) => {
    const querySql = `UPDATE bantuan_sosial SET status = 'Approved' WHERE id = ?`;
    connection.query(querySql, [id], callback);
};

exports.updateStatusReject = (id, callback) => {
    const querySql = `UPDATE bantuan_sosial SET status = 'Rejected' WHERE id = ?`;
    connection.query(querySql, [id], callback);
};

exports.detailsQuery1 = (id, callback) => {
    const querySql = `
    SELECT ALL 
        bs.id, 
        pb.nik, 
        pb.nama, 
        pb.alamat, 
        pb.golongan,
        bs.status 
    FROM 
        bantuan_sosial AS bs 
    JOIN 
        penerima_bantuan as pb on pb.id = bs.penerima_bantuan_id 
    WHERE 
        bs.id = ? GROUP BY bs.id`
    connection.query(querySql, [id], callback);
};

// itemModel.js

exports.detailsQuery2 = (id, callback) => {
    const querySql = `
        SELECT 
            bsd.id, 
            sg.id AS stok_gudang_id, 
            sg.qty AS stok_gudang_qty, 
            sg.satuan AS stok_gudang_satuan, 
            sg.nama 
        FROM 
            bantuan_sosial_details AS bsd 
        JOIN 
            stok_gudang AS sg 
        ON 
            sg.id = bsd.stok_gudang_id 
        WHERE 
            bsd.bantuan_sosial_id = ?`;
    connection.query(querySql, [id], callback);
};
