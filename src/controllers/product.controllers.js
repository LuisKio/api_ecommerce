const ProductServices = require('../services/product.services');
const CarServices = require('../services/car.services');

const createProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const user = req.user;

        if (data.availableQty) {
            data.status = true;
        }
        
        data.userId = user.id;
        await ProductServices.createProduct(data);

        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const data = req.body;

        const { userId } = await ProductServices.getProduct(data.productId);

        if (userId !== req.user.id) {
            return next({
                status: 400,
                message: 'Hubo un error al actualizar el producto',
                error: 'Wrong value'
            });
        };

        const payload = {
            description: data.description
        };

        await ProductServices.updateProduct(data, payload);


        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const data = await ProductServices.getProducts();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createProduct,
    updateProduct,
    getProducts,
}
