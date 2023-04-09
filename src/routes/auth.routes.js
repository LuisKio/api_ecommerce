const {Router} = require('express');
const {authenticationValidator} = require('../validators/authentication.validator');
const {userLogin} = require('../controllers/auth.controllers');

const router = Router();

router.post('/auth/login', authenticationValidator,  userLogin);

module.exports = router;