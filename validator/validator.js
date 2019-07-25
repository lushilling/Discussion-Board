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

    if (!Validator.isUsername(user.username)) {
        errors.username = "Username is invalid";
    }

    //content validation rules
    if (!Validator.isContent(user.content)) {
        errors.content = "Content is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
