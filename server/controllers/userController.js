const models = require('../models/models');
const utils = require('../../shared/utils')

const userController = {};

userController.createUser = (req, res, next) => {
    try {
        // validate username, and email. Password was validated when it was hashed.
        if(!utils.isValidEmail(req.body.email)) return next('Invalid email format');
        if(!utils.isValidUsername(req.body.username)) return next('Invalid username format');
        models.User.create({username: `${req.body.username}`, password: `${res.locals.password}`, email: `${req.body.email}`, profilePicture: ''})
        .then((data) => {
            res.locals.data = data;
            return next();
        })
        .catch(() => next('Error creating user, please ensure username and email are unique'))
    } catch {
        return next('Error creating user')
    }
}

userController.getUserInfo = (req, res, next) => {
    try {
        models.User.findOne({_id: `${req.cookies.ssid}`})
        .then((data)=>{
            res.locals.username = data.username;
            res.locals.profilePicture = data.profilePicture;
            return next()
        })
    } catch {
        return next('Error fetching user data')
    }
}

userController.getAllUsers = (req, res, next) => {
    models.User.find()
    .then((data)=> {
        res.locals = data;
        return next();
    })
    .catch(err => next(err));
}

userController.updateUsername = (req, res, next) => {
    try {
        // validate the format of the username
        if(!utils.isValidUsername(req.body.username)) return next('Invalid username format')
        models.User.updateOne({_id: `${req.cookies.ssid}`}, { $set: {username: `${req.body.newUsername}`}})
        .then(() => {
            return next()
        })
    } catch {
        return next('Error updating username')
    }
}

userController.updatePassword = (req, res, next) => {
    try {
        // Password validation happens before it is hashed
        models.User.updateOne({_id: `${req.cookies.ssid}`}, { $set: {password: `${res.locals.password}`}})
        .then(() => {
            return next()
        })
    } catch {
        return next('Error updating password')
    }
}

userController.updateProfilePicture = (req, res, next) => {
    try {
        models.User.updateOne({_id: `${req.cookies.ssid}`}, { $set: {profilePicture: `${req.body.newProfilePicture}`}})
        .then(() => {
            return next()
        })
    } catch {
        return next('Error updating profile picture')
    }
}

userController.deleteAccount = (req, res, next) => {
    try {
        models.User.findOneAndDelete({_id: `${req.cookies.ssid}`})
        .then((data)=> {
            console.log('Deleted user', data)
            return next();
        })
    } catch {
        return next('Failed to delete user')
    }
}

userController.deleteAllUsers = (req, res, next) => {
    models.User.deleteMany({})
    .then(()=> {
        res.locals.status = 'All Users Dropped'
        return next();
    })
    .catch(err => next(err));
}

module.exports = userController;