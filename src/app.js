const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');
const jsome = require('jsome');
const file = require('express-fileupload');

const routeAuth = require('./routes/auth');
const routeOrder = require('./routes/order.js')

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(colors.green('[+] Connected to database'));
}).catch(err => {
    console.log(colors.red('[-] Error connecting to database'));
})

const app = express();

app.use(morgan('dev'));
app.use(file());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    Project : 'NML - Express',
    Version : '1.0.0',  
  });
});

app.use('/api/v1', api);
app.use('/auth/', routeAuth)
app.use('/order/', routeOrder)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
