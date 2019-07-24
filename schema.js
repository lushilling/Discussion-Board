const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    context: String
});

let users = mongoose.model('users', userSchema);

module.exports = users;