const models = require('../models/models');

const userController = {};

userController.createUser = (req, res, next) => {
    try {
        if(req.body.username === '' || req.body.password === '' || req.body.email==='') return next('username or password not provided');
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