const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.DATABASE_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //Storing the profile picture as a url, the BLOB format takes too much space in the DB
    profilePicture: { type: String }
});

const User = mongoose.model('User', userSchema);

const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 604800, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

const postSchema = new Schema({
    body: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    usernameExposed: Boolean,
    upvotes: Number,
    downvotes: Number
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

const commentSchema = new Schema({
    body: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    username: String
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

const postUpvoteDownvoteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    upvoted: Boolean,
    downvoted: Boolean,
})

const PostUpvoteDownvote = mongoose.model('PostLike', postUpvoteDownvoteSchema)

module.exports = {
    User,
    Session,
    Post,
    Comment,
    PostUpvoteDownvote
  };