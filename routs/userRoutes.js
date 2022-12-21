const { Router } = require('express');

const userController = require('../controllers/userController');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

router.post('/new', userController.createUser);

router.post('/login', userController.handleLogin);

router.put('/update/:id',userController.updatePassword);

module.exports = router;