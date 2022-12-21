const { Router} = require('express');
const { model } = require('mongoose');

const reportsController = require('../controllers/reportsController');

const router = new Router();


router.post("/material-balance",reportsController.materialBalance);

router.post('/transfers-report', reportsController.transfersReport);

router.post('/payments-report', reportsController.paymentsReport);


module.exports = router;