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

module.exports = {
    User,
  };