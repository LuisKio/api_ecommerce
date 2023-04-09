const UserServices = require('../services/user.services');
const CarServices = require('../services/car.services');
const MailerServices = require('../services/mailer.services');
const {templateAccount} = require('../templates/accountSuccessfully');
const bcrypt = require('bcrypt');

const createUser = async(req, res, next) => {
    try {
        const data = req.body;
        const userEmail = await UserServices.getUser(data.email);
        
        if(userEmail){
            return next({
                status: 400,
                message: 'El email ya esta en uso',
                error: 'User not found'
            });
        };

        const userName = await UserServices.getUserUserName(data.username);

        if(userName){
            return next({
                status: 400,
                message: 'El username ya esta en uso',
                error: 'User not found'
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash;

        const {id} = await UserServices.createUser(data);
        
        const payloadCar = {
            userId: id
        }

        await CarServices.createCar(payloadCar);

        res.status(201).send();

        const emailData = {
            to: data.email,
            subject: 'Cuenta creada de Ecommerce',
            text: 'Tu cuenta ha sido creada con éxito',
            html: templateAccount
        }

        MailerServices.sendEmail(emailData);
    } catch (error) {
        next(error);
    };
};

const updateUserName = async(req, res, next) => {
    try {
        const {username} = req.body;
        const user = await UserServices.getUserUserName(username);
        
        if(user){
            return next({
                status: 409,
                message: 'El username ya esta en uso',
                error: 'User not found'
            });
        };
    
        await UserServices.updateUser(req.user, username);
        res.status(200).json();
    } catch (error) {
        next(error);
    };
};


module.exports = {
    createUser,
    updateUserName
}