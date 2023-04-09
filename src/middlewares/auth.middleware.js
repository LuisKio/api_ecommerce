const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next) => {
    const token = req.headers['access-token'];

    if(!token){
        next({
            status: 401,
            message: 'No token provided',
            error: 'Unauthorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {algorithms: 'HS512'});
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = authentication;