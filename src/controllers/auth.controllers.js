const UserServices = require('../services/user.services');
const AuthServices = require('../services/auth.services');
const bcrypt = require('bcrypt');

const userLogin = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserServices.getUser(email);

        if(!user){
            return next({
                status: 409,
                message: 'Alguno de sus datos es incorrecto',
                error: 'User not found'
            });
        };

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return next({
                status: 409,
                message: 'Alguno de sus datos es incorrecto',
                error: 'User not found'
            });
        };

        const {id, username, avatar} = user;
        const token = AuthServices.genToken({id, username, email});

        res.status(200).json({
            username,
            email,
            avatar,
            token
        });

    } catch (error) {
        next(error)
    };
};

module.exports = {
    userLogin
}