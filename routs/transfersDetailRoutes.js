const { Router } = require('express');
const transfersDetailController = require('../controllers/transfersDetailController');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.get("/:id", authenticated,transfersDetailController.getTransfersDetail);

router.post("/search", authenticated,transfersDetailController.searchTransfersDetail);

router.post("/new/:id", authenticated,transfersDetailController.addTransferDetail);

router.delete("/delete/:id", authenticated,transfersDetailController.deleteTransferDetail);

router.put("/update/:id", authenticated,transfersDetailController.updateTransferDetail);


module.exports = router;