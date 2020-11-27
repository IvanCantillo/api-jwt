const router = require('express').Router();
const authController = require('../controllers/auth');
const token = require('../helpers/tokenValidation');

router.get('/', authController.index);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/dashboard', token.varify, authController.dashboard);

module.exports = router;