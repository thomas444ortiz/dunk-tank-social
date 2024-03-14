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
    const regex = /^[a-zA-Z_0-9]{3,20}$/;
    return regex.test(username);
}

utils.isValidPostContent = (content) => {
    // Validates post content: length between 5 and 500 characters.
    return content.length >= 5 && content.length <= 500;
}

utils.formatElapsedTime = (date, currentDate) => {
    const timestampDate = new Date(date);
    const now = new Date(currentDate);
    const diffTime = Math.abs(now - timestampDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays >= 1) {
        if (diffDays < 7) {
            return `${diffDays}d`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks}w`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months}m`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `${years}y`;
        }
    } else {
        if(diffHours < 1){
            return('Less than 1h')
        }
        else{
            return `${diffHours}h`;
        }
    }
}


module.exports = utils;