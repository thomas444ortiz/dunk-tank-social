// validate email. returns true if valid and false if not
function isValidEmail(email){
    // email must be between 3 and 254 characters
    if(email.length < 3 || email.length > 254) return false;
    // checks format, includes '@', separates local & domain parts with valid characters.
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

// validate password. returns true if valid and false if not
function isValidPassword(password) {
    const minLength = 8;
    const maxLength = 64;
    // Validates password: 8-64 chars, with mix of upper/lowercase, numbers, & special chars.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    return regex.test(password) && password.length >= minLength && password.length <= maxLength;
}


function isValidUsername(username) {
    // Validates username: 3-20 chars, allows letters, underscores, dots, @, and dashes.
    const regex = /^[a-zA-Z_.@-]{3,20}$/;
    return regex.test(username);
}

function isValidPostContent(content) {
    // Validates post content: length between 5 and 500 characters.
    return content.length >= 5 && content.length <= 500;
}