const koneksi = require('../config/database');
const Bansos = require('../models/itemModel');
const BansosDetails = require('../models/detailsModel');
const util = require('util');

// Promisify the functions
const insertBansos = util.promisify(Bansos.insert);
const lastInsertID = util.promisify(Bansos.lastInsertID);
const insertBansosDetails = util.promisify(BansosDetails.insert);
const listBansos = util.promisify(Bansos.getList)
const approval = util.promisify(Bansos.updateStatusApprove)
const rejection = util.promisify(Bansos.updateStatusReject)
const getDetail1 = util.promisify(Bansos.detailsQuery1)
const getDetail2 = util.promisify(Bansos.detailsQuery2)

exports.insertBansos = async (req, res) => {
    try {
        const { penerima_bantuan_id, bantuan_sosial_details } = req.body;

        // Insert Bansos
        await insertBansos(penerima_bantuan_id);

        // Get the last insert ID
        const lastInsertIdResult = await lastInsertID();
        const id = lastInsertIdResult[0]["LAST_INSERT_ID()"];

        // Insert Bansos details
        for (let i = 0; i < bantuan_sosial_details.length; i++) {
            await insertBansosDetails(bantuan_sosial_details[i].stok_gudang_id, id);
        }

        return res.status(200).json({ message: 'Bansos berhasil diinsert', success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Bansos tidak berhasil diinsert', error: err });
    }
};


exports.listBansos = async (req, res) => {
    let keyword = req.query.keyword
    
    try {
        let result = await listBansos(keyword)
        return res.status(200).json({ message: 'Sukses', data: result });
    } catch (err) {
        return res.status(500).json({ message: 'List gagal dimuat', error: err });
    }
};

exports.approval = async (req, res) => {
    let id = req.params.id
    
    try {
        await approval(id)
        return res.status(200).json({ message: 'bantuan berhasil disetujui', success: true });
    } catch (err) {
        return res.status(500).json({ message: 'gagal memuat status', error: err });
    }
};

exports.rejection = async (req, res) => {
    let id = req.params.id
    
    try {
        await rejection(id)
        return res.status(200).json({ message: 'bantuan tidak disetujui', success: true });
    } catch (err) {
        return res.status(500).json({ message: 'gagal memuat status', error: err });
    }
};

exports.detail = async (req, res) => {
    let id = req.params.id
    
    try {
        let detail1 = await getDetail1(id)
        let detail2 = await getDetail2(id)
        if (detail1.length > 0) {
            detail1[0].stok_gudang = detail2
        }
        return res.status(200).json({ message: 'detail berhasil dimuat', success: true, data:detail1 });
    } catch (err) {
        return res.status(500).json({ message: 'detail gagal dimuat', error: err });
    }
};



