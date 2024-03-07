// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/createPost',
    postController.createPost,
    (req, res) => {
        return res.status(200).json({});
    }
)

router.delete('/deletePost',
    postController.deletePost,
    (req, res) => {
        return res.status(200).json({})
    }
)

router.get('/getAllPosts',
    postController.getAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.delete('/deleteAllPosts',
    postController.deleteAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;