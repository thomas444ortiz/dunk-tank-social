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

router.patch('/updateUsername',
    userController.updateUsername,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.patch('/updatePassword',
    userController.updatePassword,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.patch('/updateProfilePicture',
    userController.updateProfilePicture,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.delete('/deleteAccount',
    // delete all posts the user made
    // delete all other info the user made
    // delete the user account
    // remove the cookies
    // end the session
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