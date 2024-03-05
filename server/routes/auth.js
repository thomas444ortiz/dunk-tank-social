// require in Express, router, and controllers
const express = require('express');
const router = express.Router();

router.post('/signup', (req, res)=>{
    console.log('req.body from /auth/signup post:', req.body);
    return res.status(200).json({})
})

router.post('/login', (req, res)=>{
    console.log('req.body from /auth/login post:', req.body);
    return res.status(200).json({})
})

// export the router
module.exports = router;