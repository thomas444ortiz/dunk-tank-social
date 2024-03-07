const models = require('../models/models');

const sessionController = {};

sessionController.createSession = (req, res, next) => {
    try {
        // check the db for an already existing session 
        models.Session.findOne({cookieId: `${res.locals.ssid}`})
        .then((data) =>{
            // if the data is not null, then there is already a session so we can just move on
            if(data !== null) return next();
            // if no existing session, create one
            models.Session.create({cookieId: `${res.locals.ssid}`})
            .then((data)=>{
                return next();
            });
        });
    } catch {
        return next('Error creating session');
    }
}

sessionController.verifySession = (req, res, next) => {
    try {
        models.Session.findOne({cookieId: `${req.cookies.ssid}`})
        .then((data) =>{
            // if the data is not null, then there is a valid session and we can move on
            if(data !== null) return next();
            // but if the data is null, there is no session so we must redirect to the /login page
            else return next('No valid session')
        });
    } catch {
        return next('Failure to verify session')
    }
}

sessionController.endSession = (req, res, next) => {
    try {
        models.Session.findOneAndDelete({cookieId: `${req.cookies.ssid}`})
        .then(()=>{
            return next()
        })
    } catch {
        return next('Error ending session')
    }
}

module.exports = sessionController;