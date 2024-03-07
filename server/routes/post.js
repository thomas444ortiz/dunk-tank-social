// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/postController')
const models = require('../models/models');
const postController = require('../controllers/postController');

router.post('/createPost',
    userController.createPost,
    (req, res) => {
        return res.status(200).json({});
    }
)

router.get('/getAllPosts',
    userController.getAllPosts,
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