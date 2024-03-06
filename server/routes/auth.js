// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')

router.post('/signup', 
    authController.hashPassword,
    authController.createUser,
    cookieController.setSSIDCookie,
    sessionController.createSession,
    (req, res)=> {
        return res.redirect('/home')
    }
)

router.post('/login', 
    authController.loginUser,
    cookieController.setSSIDCookie,
    sessionController.createSession,
    (req, res) => {
        return res.redirect('/home')
    }
)

router.get('/allUsers',
    authController.getAllUsers,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;