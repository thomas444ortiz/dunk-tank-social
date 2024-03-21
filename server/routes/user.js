// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const sessionController = require('../controllers/sessionController')
const cookieController = require('../controllers/cookieController');
const commentController = require('../controllers/commentController');
const upvoteDownvoteController = require('../controllers/upvoteDownvoteController');

// get the info associated with a specific user
router.get('/userInfo',
    userController.getUserInfo,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// update the username of a specific user
router.patch('/updateUsername',
    userController.updateUsername,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// update the password of a specific user
router.patch('/updatePassword',
    authController.hashPassword,
    userController.updatePassword,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// update the profile picture of a specific user
router.patch('/updateProfilePicture',
    userController.updateProfilePicture,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// delete a users account
router.delete('/deleteAccount',
    sessionController.verifySession,
    // delete all other info the user made (likes, comments, etc)
    upvoteDownvoteController.deleteAllUpvotesDownvotesFromUser,
    commentController.deleteAllCommentsByUser,
    postController.deleteAllPostsByUser,
    // then delete the account
    userController.deleteAccount,
    sessionController.endSession,
    cookieController.removeSSIDCookie,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)
 
// export the router
module.exports = router;