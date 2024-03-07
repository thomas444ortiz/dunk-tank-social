// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/postController')
const models = require('../models/models');

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

// export the router
module.exports = router;