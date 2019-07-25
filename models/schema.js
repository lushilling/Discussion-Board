const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    content: String,
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 320
    }
});

let User = mongoose.model('users', UserSchema);

module.exports = User;