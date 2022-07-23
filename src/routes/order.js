const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const modelUsers = require('../models/Users')
const modelOrder = require('../models/Order')

route.post('/getall', (req,res) => {
        jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
            if(err){
                res.json({ message: 'Invalid Token' }).status(301)
            }else{
                modelUsers.find({ username: decoded.username }, (err, data) => {
                    if(err){
                        res.json({ message: 'Error' }).status(301)
                    }else{
                        modelOrder.find({ approval: "Done" }, (err, data2) => {
                            if(err){
                                res.json({ message: 'Error' }).status(301)
                            }else{
                                res.json({ message: 'Success', data: data2 }).status(200)
                            }
                        })
                    }
                })
            }
        })
})

route.post('/pending', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' })
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ error: '[!] Wrong Authorization' })
                }else{
                    if(data[0].role == 'pengemudi'){
                        modelOrder.find({ approval: 'Pengemudi' }, (err, data2) => {
                            if(err){
                                res.json({ error: '[!] Wrong Authorization' })
                            }else{
                                res.json({ message: 'Success', data: data2 })
                            }
                        })
                    }else{
                        modelOrder.find({ approval: 'Pending' }, (err, data2) => {
                            if(err){
                                res.json({ error: '[!] Wrong Authorization' })
                            }else{
                                res.json({ message: 'Success', data: data2 })
                            }
                        })
                    }
                }
            })
        }
    })
})

route.post('/paket', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' })
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ error: '[!] Wrong Authorization' })
                }else{
                    modelOrder.updateMany({ no_transaksi: req.body.no_transaksi }, { $set: { approval: 'Done' } }, (err, data2) => {
                        if(err){
                            res.json({ error: '[!] Wrong Authorization' })
                        }else{
                            res.json({ message: 'Success' })
                        }
                    })
                }
            })
        }
    })
})

route.post('/pengemudi', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' })
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ error: '[!] Wrong Authorization' })
                }else{
                    modelOrder.updateOne({ no_transaksi: req.body.no_transaksi }, { approval: 'Pengemudi' }, (err, data2) => {
                        if(err){
                            res.json({ error: '[!] Wrong Authorization' })
                        }else{
                            res.json({ message: 'Success', data: data2 })
                        }
                    })
                }
            });
        }
    })
})

route.post('/get', (req,res) => {
    if(req.body.type == 'customer'){
        modelOrder.findOne({ no_transaksi: req.body.no_transaksi }, (err, data2) => {
            if(err){
                res.json({ message: 'Error' }).status(301)
            }else{
                res.json({ message: 'Success', data: data2 }).status(200)
            }
        })
    }else{
        jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
            if(err){
                res.json({ message: 'Invalid Token' }).status(301)
            }else{
                modelUsers.find({ username: decoded.username }, (err, data) => {
                    if(err){
                        res.json({ message: 'Error' }).status(301)
                    }else{
                        modelOrder.findOne({ no_transaksi: req.body.no_transaksi }, (err, data2) => {
                            if(err){
                                res.json({ message: 'Error' }).status(301)
                            }else{
                                res.json({ message: 'Success', data: data2 }).status(200)
                            }
                        })
                    }
                })
            }
        })
    }
})

route.post('/search', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ message: 'Invalid Token' }).status(301)
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ message: 'Error' }).status(301)
                }else{
                    modelOrder.find({ no_transaksi: { $regex: req.body.no_transaksi } }, (err, data2) => {
                        if(err){
                            res.json({ message: 'Error' }).status(301)
                        }else{
                            res.json({ message: 'Success', data: data2 }).status(200)
                        }
                    })
                }
            })
        }
    })
})

route.post('/update', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ message: 'Invalid Token' }).status(301)
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ message: 'Error' }).status(301)
                }else{
                    modelOrder.findOneAndUpdate({ no_transaksi: req.body.no_transaksi }, { $set: { status_pengiriman: req.body.status_pengiriman } }, (err, data2) => {
                        if(err){
                            res.json({ message: 'Error' }).status(301)
                        }else{
                            res.json({ message: 'Success', data: data2 }).status(200)
                        }
                    }
                )}
            })
        }
    })
})

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ message: 'Invalid Token' }).status(301)
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ message: 'Error' }).status(301)
                }else{
                    modelOrder.insertMany({
                        no_transaksi: req.body.no_transaksi,
                        pengirim: req.body.pengirim,
                        penerima: req.body.penerima,
                        alamat_pengirim: req.body.alamat_pengirim,
                        alamat_penerima: req.body.alamat_penerima,
                        kota_pengirim: req.body.kota_pengirim,
                        kota_penerima: req.body.kota_penerima,
                        jumlah_barang: req.body.jumlah_barang,
                        no_telepon_penerima: req.body.no_telepon_penerima,
                        no_telepon_pengirim: req.body.no_telepon_pengirim,
                        ukuran_paket: req.body.ukuran_paket,
                        total_harga: req.body.total_harga,
                        travel: req.body.travel,
                        kargo: req.body.kargo,
                        status_pengiriman: 'Pending'
                    }, (err, data2) => {
                        if(err){
                            res.json({ message: 'Error' }).status(301)
                        }else{
                            res.json({ message: 'Success' }).status(200)
                        }
                    })
                }
            })
        }
    })
})

route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.json({ message: 'Invalid Token' }).status(301)
        }else{
            modelUsers.find({ username: decoded.username }, (err, data) => {
                if(err){
                    res.json({ message: 'Error' }).status(301)
                }else{
                    modelOrder.deleteOne({ no_transaksi: req.body.no_transaksi }, (err, data2) => {
                        if(err){
                            res.json({ message: 'Error' }).status(301)
                        }else{
                            res.json({ message: 'Success' }).status(200)
                        }
                    })
                }
            })
        }
    })
})

module.exports = route
