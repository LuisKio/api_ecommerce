const { check } = require('express-validator');
const validateResult = require('./validate');

const registerValidator = [
    check('username', 'El nombre de usuario está vacío')
        .notEmpty()
        .exists()
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe de ser mayor a tres caracteres'),

    check('email', 'El email está vacío')
        .notEmpty()
        .exists()
        .isEmail().withMessage('Ingresa un email válido'),

    check('password', 'La contraseña es requerida')
        .notEmpty()
        .isLength({ min: 8, max: 100 }).withMessage('Contraseña invalida')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const updateUsernameValidator = [
    check('username', 'El nombre de usuario es requerido')
        .notEmpty()
        .exists()
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe de ser mayor a tres caracteres'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    registerValidator,
    updateUsernameValidator
}