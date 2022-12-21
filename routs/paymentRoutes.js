const { Router } = require('express');

const paymentController = require('../controllers/paymentController');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.post("/", authenticated,paymentController.allPeyments);

router.post("/new", authenticated,paymentController.addPayment);

router.put("/update/:id", authenticated,paymentController.updatePayment);

router.delete("/delete/:id", authenticated,paymentController.deletePayment);


module.exports = router;