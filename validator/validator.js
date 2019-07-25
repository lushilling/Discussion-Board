const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
    data.username = !isEmpty(data.username) ? data.username : "";
    data.content = !isEmpty(data.content) ? data.content : "";

    //username validation rules
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    if (!Validator.isUsername(data.username)) {
        errors.username = "Username is invalid";
    }

    //content validation rules
    if (!Validator.isContent(data.content)) {
        errors.content = "Content is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
