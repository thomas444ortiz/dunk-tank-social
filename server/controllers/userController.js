const models = require('../models/models');

const userController = {};

// function to create user
userController.createUser = (req, res, next) => {
    try {
        if(req.body.username === '' || req.body.password === '' || req.body.email==='') return next('username or password not provided');
        models.User.create({username: `${req.body.username}`, password: `${res.locals.password}`, email: `${req.body.email}`})
        .then((data) => {
            res.locals.data = data;
            return next();
        })
    } catch {
        return next('Error creating user')
    }
}

//function to get all users
userController.getAllUsers = (req, res, next) => {
    models.User.find()
    .then((data)=> {
        res.locals = data;
        return next();
    })
    .catch(err => next(err));
}

// function to delete all users 
userController.deleteAllUsers = (req, res, next) => {
    models.User.deleteMany({})
    .then(()=> {
        res.locals.status = 'All Users Dropped'
        return next();
    })
    .catch(err => next(err));
}

module.exports = userController;