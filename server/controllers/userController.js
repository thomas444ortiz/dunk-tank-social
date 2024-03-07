const models = require('../models/models');

const userController = {};

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
    console.log('delete all users invoked')
    models.User.deleteMany({})
    .then(()=> {
        res.locals.status = 'All Users Dropped'
        return next();
    })
    .catch(err => next(err));
}

module.exports = userController;