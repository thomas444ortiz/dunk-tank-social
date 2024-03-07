const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.DATABASE_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 300, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

const postSchema = new Schema({
    body: String,
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = {
    User,
    Session,
    Post
  };