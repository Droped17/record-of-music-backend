require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const authenRoute = require('./routes/authen-route');
const productRoute = require('./routes/product-route');
const addressRoute = require('./routes/address-route');
const orderRoute = require('./routes/order-route');
const notfoundMDW = require('./middlewares/not-found');
const errorMDW = require('./middlewares/error');

app.use(express.json());
app.use(express.static('public'));
app.use(cors());


app.use('/authen', authenRoute);
app.use('/product',productRoute);
app.use('/address',addressRoute);
app.use('/order',orderRoute);

app.use(notfoundMDW);
app.use(errorMDW);

const PORT = process.env.PORT || '5000';
app.listen(PORT,()=> console.log(`server running on port: ${PORT}`));


