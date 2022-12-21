const { Router } = require('express');

const transfersController = require("../controllers/transfersController");
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.get("/",authenticated,transfersController.getTransfers);

router.post("/search", authenticated,transfersController.searchTransfers);

router.post("/new",authenticated,transfersController.addTransfer);

router.delete("/delete/:id", authenticated,transfersController.deleteTransfer);

router.put("/update/:id", authenticated,transfersController.updateTransfer);

module.exports = router