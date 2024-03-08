// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/userInfo',
    userController.getUserInfo,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.get('/allUsers',
    userController.getAllUsers,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.delete('/allUsers',
    userController.deleteAllUsers,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;