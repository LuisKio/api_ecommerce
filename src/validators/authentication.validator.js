const { check } = require('express-validator');
const validateResult = require('./validate');

const authenticationValidator = [
    check('email', 'El email está vacío')
        .notEmpty()
        .exists()
        .isEmail().withMessage('Ingresa un email válido'),

    check('password', 'La contraseña es requerida')
        .notEmpty()
        .isLength({ min: 8, max: 100 }).withMessage('Contraseña invalida'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    authenticationValidator,
}