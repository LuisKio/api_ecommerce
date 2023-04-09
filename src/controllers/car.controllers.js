const CarServices = require('../services/car.services');
const ProductServices = require('../services/product.services');
const OrderServices = require('../services/order.services');
const MailerServices = require('../services/mailer.services');
const { templatePurchase } = require('../templates/accountSuccessfully');

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const product = await ProductServices.getProduct(data.productId);
        const car = await CarServices.getCarUser(req.user);
        const products = await CarServices.getProducts(car.id)
        let update = false;

        products.forEach(element => {
            if(element.productId === data.productId){
                data.quantity += element.quantity;
                update = true;
            }
        });

        if (data.quantity > product.availableQty || data.quantity <= 0) {
            return next({
                status: 400,
                message: 'Ocurrio un problema al añadir el producto',
                error: 'Low stock'
            });
        }


        if(update){
            const payload = {
                quantity: data.quantity
            }
            const ids = {
                carId: car.id,
                productId: data.productId
            }
            
            await CarServices.updateQuantity(ids, payload);
        }else{
            const payload = {
                carId: car.id,
                productId: product.id,
                quantity: data.quantity,
                price: product.price
            }

            await CarServices.addProduct(payload);
        }
        
        const updatePriceCar = {
            totalPrice: (data.quantity * product.price) + car.totalPrice
        }

        await CarServices.updatePrice(car, updatePriceCar);

        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const car = await CarServices.getCarUser(req.user);
        const products = await CarServices.getProducts(car.id);

        res.status(200).json(products);
    } catch (error) {
        throw (error);
    }
}

const purchaseProducts = async (req, res, next) => {
    try {
        const user = req.user;
        const car = await CarServices.getCarUser(user);
        const products = await CarServices.getProducts(car.id)

        products.forEach(async (element) => {
            const product = await ProductServices.getProduct(element.productId);
            const availableQty = product.availableQty - element.quantity;

            const payload = {
                availableQty
            };

            if (!availableQty) {
                payload.status = false;
            }

            await ProductServices.updateProduct(element, payload);
        });

        await CarServices.updateStatusProduct(car.id);

        // CREAR LA ORDEN DEL PEDIDO
        const payloadOrder = {
            totalPrice: car.totalPrice,
            userId: user.id,
        }

        const order = await OrderServices.createOrder(payloadOrder);

        const payloadProductsOrder = [];

        products.forEach(product => {
            payloadProductsOrder.push({
                orderId: order.id,
                productId: product.productId,
                quantity: product.quantity,
                price: product.Product.price
            })
        });


        await OrderServices.insertOrder(payloadProductsOrder);

        const emailData = {
            to: user.email,
            subject: 'Gracias por tu compra',
            text: 'Gracias por tu compra',
            html: templatePurchase
        }

        await MailerServices.sendEmail(emailData);


        res.status(200).json();
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    addProduct,
    getProducts,
    purchaseProducts
}