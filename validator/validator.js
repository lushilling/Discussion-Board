const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(user) {
    let errors = {};

    // if these values are not present in the user object we are validating then they will be set to empty strings for the Validator.isEmpty
    user.username = !isEmpty(user.username) ? user.username : "";
    user.content = !isEmpty(user.content) ? user.content : "";

    //username validation rules
    if (Validator.isEmpty(user.username)) {
        errors.username = "Username field is required";
    }

    if (!Validator.isLength(user.username, { min: 3, max: 20 }))  {
        errors.username = "Username is invalid";
    }

    if (!Validator.isAlphanumeric(user.username)){
        errors.username = "Username must contain letters and numbers";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
