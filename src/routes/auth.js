const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const modelUsers = require('../models/Users');

route.post('/getall', (req,res) =>{
    jwt.verify(req.body.token, process.env.SECRET, (err, token) => {
        if(err){
            res.status(401).json({
                message: 'Invalid Token'
            });
        }else{
            modelUsers.findOne({ username: token.username }, (err, user) => {
                if(err){
                    res.status(500).json({
                        message: 'Error'
                    });
                }else{
                    res.json(user).status(200);
                }
            });
        }
    })
})

route.post('/login', (req,res) => {
    modelUsers.find({ username: req.body.username }, (err,users) => {
        if(err) {
            res.status(500).json({
                message: 'Error',
                error: err
            });
        }else if(users.length == 0) {
            res.status(404).json({
                message: 'User not found'
            });
        }else{
            bcrypt.compare(req.body.password, users[0].password, (err,result) => {
                if(err) {
                    res.status(500).json({
                        message: 'Error',
                        error: err
                    });
                }else if(result) {
                    const token = jwt.sign({
                        username: users[0].username,
                        alamat: users[0].alamat,
                        fullname: users[0].fullname,
                        phone: users[0].phone,
                        role: users[0].role
                    }, 'sendmypacket');
                    res.status(200).json({
                        message: 'Login success',
                        token: token
                    });
                }else{
                    res.status(401).json({
                        message: 'Password incorrect'
                    });
                }
            });
        }
    })
})

route.post('/register', (req,res) => {
    modelUsers.find({ username: req.body.username }, (err, check) => {
        if(check.length > 0){
            res.json({
                message: 'Username already exists'
            }).status(301);
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.json({
                        message: 'Error hashing password'
                    });
                }else{
                    modelUsers.insertMany({
                        fullname: req.body.fullname,
                        username: req.body.username,
                        alamat: req.body.alamat,
                        phone: req.body.phone,
                        password: hash,
                        role: req.body.role
                    }, (err, result) => {
                        if(err){
                            res.json({
                                message: 'Error inserting user'
                            });
                        }else{
                            res.json({
                                message: 'Users registered'
                            });
                        }
                    });
                }
            })
        }
    })
})

module.exports = route;
