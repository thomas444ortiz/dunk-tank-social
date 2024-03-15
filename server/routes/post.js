// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const sessionController = require('../controllers/sessionController')

router.post('/createPost',
    sessionController.verifySession,
    postController.createPost,
    (req, res) => {
        return res.status(200).json({});
    }
)

router.delete('/deletePost',
    sessionController.verifySession,
    postController.deletePost,
    (req, res) => {
        return res.status(200).json({})
    }
)

router.get('/allPostsByUser',
    postController.getAllPostsByUser,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

router.get('/allPosts',
    // sessionController.verifySession,
    postController.getAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.delete('/allPosts',
    postController.deleteAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;