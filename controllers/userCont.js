const connection = require('../config/database');
const Penerima = require('../models/userModel');

exports.createPenerima = (req, res) => {
    const data = { ...req.body };

    Penerima.create(data, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data penerima_bantuan!', error: err });
        }

        res.status(201).json({ success: true, message: 'Berhasil insert data penerima_bantuan!' });
    });
};

exports.getPenerima = (req, res) => {
    Penerima.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        res.status(200).json({ success: true, data: rows });
    });
};

exports.getPenerimaByNik = (req, res) => {
    const nik = req.params.nik;
    Penerima.getByNik(nik, (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        res.status(200).json({ success: true, data: rows });
    });
};

exports.updatePenerima = (req, res) => {
    const data = { ...req.body };
    const nik = req.params.nik;

    Penerima.update(nik, data, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        res.status(200).json({ success: true, message: 'Berhasil update data penerima_bantuan!' });
    });
};

exports.deletePenerima = (req, res) => {
    const nik = req.params.nik;

    Penerima.delete(nik, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
    });
};
