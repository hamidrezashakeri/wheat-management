const { Router } = require('express');
const qoutaSalesController = require('../controllers/qoutaSalesController');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.get("/",authenticated,qoutaSalesController.getQoutaSales);

router.get("/:id", authenticated,qoutaSalesController.getSingleQoutaSales);

router.get("/detail/:id", authenticated,qoutaSalesController.qoutaSaleByPaymentId);

router.post("/search", authenticated,qoutaSalesController.searchQoutaSales);

router.delete("/delete/:id", authenticated,qoutaSalesController.deleteQoutaSale);

router.get("/transfers-detail/:id", authenticated,qoutaSalesController.getTransfersQoutaSale);

router.post("/new/:id", authenticated,qoutaSalesController.newQoutaSales);

router.put('/update/:id', authenticated, qoutaSalesController.updateQoutaSale);

router.post("/change-status", authenticated,qoutaSalesController.changeStatusRent);

router.post("/search-transfers", authenticated,qoutaSalesController.searchTransfersQoutaSales);

router.delete("/delete-transfer/:id", authenticated,qoutaSalesController.deleteTransfersQoutaSale);

router.put("/update-transfer/:id", authenticated,qoutaSalesController.updateTransferQoutaSale);

router.post("/transfer/:id", authenticated,qoutaSalesController.newTransferQoutaSale);


module.exports = router;