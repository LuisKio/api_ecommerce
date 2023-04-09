const {check} = require('express-validator');
const validateResult = require('./validate');

const createValidator = [
    check('name', 'El nombre del producto no puede estar vacío')
        .notEmpty()
        .exists()
        .custom(value => value.replace(/\s*/g, ""))
        .isLength({min: 5}).withMessage('El nombre del producto debe ser mayor a 5 caracteres'),

    check('description', 'La descripción no puede estar vacío')
        .notEmpty()
        .exists()
        .custom(value => value.replace(/\s*/g, "")),
        
    check('price', 'El precio del producto no puede estar vacío')
        .notEmpty()
        .exists()
        .isNumeric()
        .isFloat({min: 1}),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const updateValidator = [
    check('description', 'La descripción no puede estar vacío')
        .notEmpty()
        .exists()
        .custom(value => value.replace(/\s*/g, "")),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    createValidator,
    updateValidator
}