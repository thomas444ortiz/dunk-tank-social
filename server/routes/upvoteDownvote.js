// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const upvoteDownvoteController = require('../controllers/upvoteDownvoteController')

router.post('/toggleUpvoteDownvote', 
    upvoteDownvoteController.toggleUpvoteDownvote,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

router.post('/upvotesDownvotesFromPost', 
    upvoteDownvoteController.checkIfUserUpvotedDownvotedPost,
    upvoteDownvoteController.getAllUpvotesDownvotesFromPost,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)


router.get('/allUpvotesDownvotes', 
    upvoteDownvoteController.getAllUpvotesDownvotes,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

router.delete('/allUpvotesDownvotes',
    upvoteDownvoteController.deleteAllUpvotesDownvotes,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;