var bcrypt = require('bcryptjs');

const authController = {};

authController.hashPassword = (req, res, next) => {
    try {
        // hash the password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        // update it
        res.locals.password = hash;
        return next();
    } catch {
        return next('Error hashing password')
    }
}

module.exports = authController;