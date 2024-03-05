// require in Express, router, and controllers
const express = require('express');
const router = express.Router();

router.post('/login', (req, res)=>{
    console.log(req.body);
    return res.status(200).json({"test": "test"})
})

// export the router
module.exports = router;