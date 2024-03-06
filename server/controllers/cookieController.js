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
        next('Error setting cookie');
    }
}


module.exports = cookieController;