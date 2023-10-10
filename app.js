require('dotenv').config();
const express = require('express');
const app = express();

const notfoundMDW = require('./middlewares/not-found');
const errorMDW = require('./middlewares/error');

app.use(express.json());

app.post('/register');

app.use(notfoundMDW);
app.use(errorMDW);

const PORT = process.env.PORT || '5000';
app.listen(PORT,()=> console.log(`server running on port: ${PORT}`));


