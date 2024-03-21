// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const userController = require('../controllers/userController')

// validates user session
router.get('/validateSession',
    sessionController.verifySession,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
) 

// signs up new user
router.post('/signup', 
    authController.hashPassword,
    userController.createUser,
    cookieController.setSSIDCookie,
    sessionController.createSession,
    (req, res)=> {
        return res.status(200).json({})
    }
)

// logs user in
router.post('/login', 
    authController.loginUser,
    cookieController.setSSIDCookie,
    sessionController.createSession,
    (req, res) => {
        return res.status(200).json({})
    }
)

// logs user out
router.post('/logout',
    sessionController.endSession,
    cookieController.removeSSIDCookie,
    (req, res) => {
        return res.status(200).json({})
    }
)

// export the router
module.exports = router;