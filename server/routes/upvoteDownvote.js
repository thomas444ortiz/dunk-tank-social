// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const upvoteDownvoteController = require('../controllers/upvoteDownvoteController')
const postController = require('../controllers/postController');

// toggles upvote / downvote for a single post
router.post('/toggleUpvoteDownvote', 
    upvoteDownvoteController.toggleUpvoteDownvote,
    postController.updateUpvotesDownvotes,
    postController.exposeUsername,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

// gets all upvotes and downvotes from a post
router.post('/upvotesDownvotesFromPost', 
    upvoteDownvoteController.checkIfUserUpvotedDownvotedPost,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

// export the router
module.exports = router;