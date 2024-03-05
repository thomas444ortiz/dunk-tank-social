// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/signup', 
    authController.hashPassword,
    authController.createUser,
    (req, res)=> {
        return res.status(200).json(res.locals)
    }
)

router.post('/login', 
    // authController.hashPassword,
    authController.loginUser,
    (req, res) => {
        return res.status(200).json(res.locals)
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