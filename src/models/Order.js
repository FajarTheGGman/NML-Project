const mongoose = require('mongoose')

const Order = mongoose.Schema({
    no_transaksi: {
        type: String
    },
    pengirim: {
        type: String
    },
    penerima: {
        type: String
        
    },
    alamat_pengirim: {
        type: String
    },
    alamat_penerima: {
        type: String
    },
    kota_pengirim: {
        type: String
    },
    kota_penerima: {
        type: String
    },
    jumlah_barang: {
        type: String
    },
    no_telepon_penerima: {
        type: String
    },
    no_telepon_pengirim: {
        type: String
    },
    ukuran_paket: {
        type: String
    },
    total_harga: {
        type: Number
    },
    travel: {
        type: String,
        default: 'No'
    },
    kargo: {
        type: String,
        default: 'No'
    },
    status_pengiriman: {
        type: String,
        default: 'Pending'
    },
    approval: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model('Order', Order);
