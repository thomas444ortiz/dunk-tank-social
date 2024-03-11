// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController')

router.post('/toggleLike', 
    likeController.toggleLike,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

router.post('/likesFromPost', 
    likeController.checkIfUserLikedPost,
    likeController.getAllLikesFromPost,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

router.get('/allLikes', 
    likeController.getAllLikes,
    (req, res) =>{
        return res.status(200).json(res.locals)
    }
)

router.delete('/allLikes',
    likeController.deleteAllLikes,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;