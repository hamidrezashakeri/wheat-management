const express = require('express');

const { setHeaders } = require('./middlewares/headers');
const storeRoutes = require('./routs/storeRoutes');
const productRoutes = require('./routs/productRoutes');
const paymentsRoutes = require('./routs/paymentRoutes');
const qoutaSalesRoutes = require('./routs/qoutaSalesRoutes');
const buysDirectlyRoutes = require('./routs/buysDirectlyRoutes');
const transfersRoutes = require('./routs/transfersRoutes');
const transfersDetailRoutes = require('./routs/transfersDetailRoutes');
const userRoutes = require('./routs/userRoutes');
const reportsRoutes = require('./routs/reportsRoutes');
const connectDb = require('./utils/db');

const app = express();

//database connection
connectDb();

//app config
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(setHeaders);

//routes
app.use('/store', storeRoutes);
app.use('/product', productRoutes);
app.use('/payment', paymentsRoutes);
app.use('/qouta-sales', qoutaSalesRoutes);
app.use('/buys-directly', buysDirectlyRoutes);
app.use('/transfers', transfersRoutes);
app.use('/transfers-detail', transfersDetailRoutes);
app.use('/user', userRoutes);
app.use('/reports', reportsRoutes);

//server running
const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`server is running on port ${port}`));