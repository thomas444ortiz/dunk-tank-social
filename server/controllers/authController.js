const bcrypt = require('bcryptjs');
const models = require('../models/models');
const utils = require('../utils')

const authController = {};

authController.hashPassword = (req, res, next) => {
    try {
        // validate the password format
        if(!utils.isValidPassword(req.body.password)) return next('Invalid password format');
        // hash the password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        // store the hashed password on locals
        res.locals.password = hash;
        return next();
    } catch {
        return next('Error hashing password')
    }
}

authController.loginUser = (req, res, next) => {
    try {
        models.User.findOne({email: `${req.body.email}`})
        .then((data)=> {
            if(data === undefined || data === null) return next('Invalid email or password')
            if((bcrypt.compareSync(req.body.password, data.password))){
                res.locals.userId = data._id;
                return next();                
            } else {
                return next('Invalid email or password');
            }
        }) 
    } catch {
        return next('Error logging in') 
    } 
}

module.exports = authController;