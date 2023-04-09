const {Users} = require('../models');

class UserServices {
    static async getUser(email){
        try {
            const user = Users.findOne({
                where: {
                    email
                }
            });

            return user;
        } catch (error) {
            throw(error);
        };
    };

    static async getUserUserName(username){
        try {
            const user = Users.findOne({
                where: {
                    username
                }
            });
            return user
        } catch (error) {
            throw(error);
        };
    };

    static async createUser(data){
        try {
            const {dataValues} = await Users.create(data);

            return dataValues;
        } catch (error) {
            throw(error);
        };
    };

    static async updateUser({id}, username){
        try {
            await Users.update({username}, {
                where: {
                    id
                }
            });
        } catch (error) {
            throw(error);
        };
    };
};

module.exports = UserServices;