const models = require('../models/models');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    try {
        models.User.findOne({email: `${req.body.email}`})
        .then(data => {
          res.cookie('ssid', `${data._id}`, { httpOnly: true })
          res.locals.ssid = data._id;
          return next();    
        })
    } catch {
        next('Error setting ssid cookie');
    }
}

cookieController.removeSSIDCookie = (req, res, next) => {
    try {
        res.clearCookie('ssid');
        return next();
    } catch {
        return next('Error removing ssid cookie');
    }
}


module.exports = cookieController;