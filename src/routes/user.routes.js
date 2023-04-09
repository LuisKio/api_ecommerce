const {Router} = require('express');
const {registerValidator, updateUsernameValidator} = require('../validators/user.validator');
const {createUser, updateUserName} = require('../controllers/user.controllers');
const authentication = require('../middlewares/auth.middleware');


const router = Router();

router.post('/user/create', registerValidator, createUser);
router.put('/user/update', updateUsernameValidator, authentication, updateUserName);


module.exports = router;