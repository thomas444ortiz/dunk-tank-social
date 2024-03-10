const express = require('express');
const commentController = require('../controllers/commentController');
const sessionController = require('../controllers/sessionController')
const router = express.Router();

router.post('/createComment', 
    sessionController.verifySession,
    commentController.createComment,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

router.get('/allComments', 
    commentController.getAllComments,
    (req, res) => {
        return res.status(200).json(res.locals)
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