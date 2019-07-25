const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    content: String
});

let users = mongoose.model('user', userSchema);

module.exports = users;