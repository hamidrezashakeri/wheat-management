const { Router } = require("express");

const productController = require('../controllers/productController');
const { authenticated } = require('../middlewares/auth');

const router  = new Router();


router.get('/', authenticated,productController.getAllProducts);

router.post("/new", authenticated,productController.addProduct);

router.post('/search', authenticated,productController.searchProducts);

router.delete("/delete/:id", authenticated,productController.deleteProduct);

router.put('/update/:id', authenticated,productController.updateProduct);

module.exports = router;