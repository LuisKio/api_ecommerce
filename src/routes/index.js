const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const productRouter = require('./products.routes');
const carRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

const apiRouter = (app) => {
    app.use('/api/v1/docs', swaggerUi.serve);
    app.use('/api/v1/docs', swaggerUi.setup(swaggerDocument));
    app.use('/api/v1', authRouter);
    app.use('/api/v1', userRouter);
    app.use('/api/v1', productRouter);
    app.use('/api/v1', carRouter);
    app.use('/api/v1', orderRouter);
}

module.exports = apiRouter;