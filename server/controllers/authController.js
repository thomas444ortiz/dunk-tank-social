const bcrypt = require('bcryptjs');
const models = require('../models/models');

const authController = {};

authController.hashPassword = (req, res, next) => {
    try {
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

authController.createUser = (req, res, next) =>{
    try {
        if(req.body.username === '' || req.body.password === '' || req.body.email==='') return next('username or password not provided');
        models.User.create({username: `${req.body.username}`, password: `${res.locals.password}`, email: `${req.body.email}`})
        .then((data) => {
            res.locals.data = data;
            console.log(res.locals.data);
            return next();
        })
    } catch {
        return next('Error creating user')
    }
}

authController.loginUser = (req, res, next) => {
    try {
        console.log('login user method invoked')
        models.User.findOne({email: `${req.body.email}`})
        .then((data)=> {
            if((bcrypt.compareSync(req.body.password, data.password))){
                res.locals = data;
                return next();                
            } else {
                return next('Invalid email or password');
            }


        })
    } catch {
        return next('Error logging in')
    }
}

//function to get all users
authController.getAllUsers = (req, res, next) => {
    models.User.find()
    .then((data)=> {
        res.locals = data;
        return next();
    })
    .catch(err => next(err));
}

module.exports = authController;