const models = require('../models/models');

const sessionController = {};

sessionController.createSession = (req, res, next) => {
    try {
        models.Session.create({cookieId: `${res.locals.ssid}`})
        .then((data)=>{
            res.locals.session = data;
            console.log(res.locals.session);
            return next();
        })
    } catch {
        return next('Error creating session');
    }
}

module.exports = sessionController;