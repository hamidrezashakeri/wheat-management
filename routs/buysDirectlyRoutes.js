const { Router } = require('express');
const buysDirectlyController = require('../controllers/buysDirectlyController');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.post("/", authenticated,buysDirectlyController.getBuysDirectly);

router.post("/new", authenticated,buysDirectlyController.addBuysDirectly);

router.delete("/delete/:id", authenticated,buysDirectlyController.deleteBuysDirectly);

router.put("/update/:id", authenticated,buysDirectlyController.updateBuysDirectly);

router.post("/change-status", authenticated,buysDirectlyController.changeStatusRent);
module.exports = router;