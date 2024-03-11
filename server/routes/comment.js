const express = require('express');
const commentController = require('../controllers/commentController');
const sessionController = require('../controllers/sessionController')
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/createComment', 
    sessionController.verifySession,
    postController.validatePost,
    userController.getUserInfo,
    commentController.createComment,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

router.post('/postComments', 
    commentController.getAllCommentsFromPost,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

router.get('/allComments', 
    commentController.getAllComments,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

router.delete('/deleteComment',
    commentController.deleteComment,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

router.delete('/allComments', 
    commentController.deleteAllComments,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

// export the router
module.exports = router;