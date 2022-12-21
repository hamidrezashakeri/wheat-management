const { Router } = require('express');
const storeController = require('../controllers/storeController');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.get("/", authenticated, storeController.allStore);

router.post("/new", authenticated,storeController.addStore);

router.post("/change-status", authenticated,storeController.changeStatusStore);

router.delete("/delete/:id", authenticated,storeController.deleteStore);

router.post("/search", authenticated,storeController.searchStores);

router.put("/update/:id", authenticated,storeController.updateStore);



module.exports = router;