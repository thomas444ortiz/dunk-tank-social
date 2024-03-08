// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const sessionController = require('../controllers/sessionController')
const cookieController = require('../controllers/cookieController')

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
    authController.hashPassword,
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
    postController.deleteAllPostsByUser,
    // delete all other info the user made (likes, comments, etc)
    userController.deleteAccount,
    sessionController.endSession,
    cookieController.removeSSIDCookie,
    (req, res) => {
        console.log('delete account invoked')
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