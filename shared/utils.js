const utils = {}

// validate email. returns true if valid and false if not
utils.isValidEmail = (email) => {
    // email must be between 3 and 254 characters
    if(email.length < 3 || email.length > 254) return false;
    // checks format, includes '@', separates local & domain parts with valid characters.
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

// validate password. returns true if valid and false if not
utils.isValidPassword = (password) => {
    // Validates password: Checks only for length between 8 and 64 characters.
    return password.length >= 8 && password.length <= 64;
}

utils.isValidUsername = (username) => {
    // Validates username: 3-20 chars, allows letters, underscores, dots, @, and dashes.
    const regex = /^[a-zA-Z_]{3,20}$/;
    return regex.test(username);
}

utils.isValidPostContent = (content) => {
    // Validates post content: length between 5 and 500 characters.
    return content.length >= 5 && content.length <= 500;
}

module.exports = utils;