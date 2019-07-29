const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let ItemSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 320
    },
    content: String
});

let Item = mongoose.model('items', ItemSchema);

module.exports = Item;