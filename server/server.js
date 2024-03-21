const express = require("express");
const path = require("path");
const app = express();
const authRouter = require ('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const upvoteDownvoteRouter = require('./routes/upvoteDownvote')
const adminRouter = require('./routes/admin')
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Create rate limit rule, max 500 request per 5 mins
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5000, // limit each IP to 500 requests per windowMs
}); 

app.use(cookieParser());
app.use(express.json());
app.use(limiter);

// serve everything from the build folder
app.use(express.static(path.join(__dirname, "../build")));
 
// handle logic
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/upvoteDownvote', upvoteDownvoteRouter);
app.use('/upvoteDownvote', upvoteDownvoteRouter);
// create an admin route, with a randomly generated id for admin actions
app.use('/admin38612073456783', adminRouter);

// handle all other routes by serving the index.html file
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// global error handler
app.use("/", (err, req, res, next) => {
  const defaultErr = {
    log: "Global error handler caught an error",
    status: 500,
    message: { err: err },
  };
  const errorObj = { ...defaultErr, err };
  res.status(errorObj.status).json(errorObj.message);
});

// Starts the server on port 3000
app.listen(3000, (err) => {
  if (err) console.log("Error setting up server");
  console.log("Server running and ready to work :)");
});
