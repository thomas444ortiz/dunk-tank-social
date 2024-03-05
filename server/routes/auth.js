// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/signup', 
    authController.hashPassword,
    (req, res)=> {
        console.log('this is res.locals from /auth/signup', res.locals)
        return res.status(200).json({})
    }
)

router.post('/login', (req, res)=>{
    console.log('this is res.locals from /auth/login', res.locals)
    return res.status(200).json({})
})

// export the router
module.exports = router;