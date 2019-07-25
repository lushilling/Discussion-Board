const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

//username
const name = require("./routes/name");

//connect to mongoose
mongoose.connect(
    'mongodb://localhost:27017/example',
    { userNewUrlParser: true}
).then(
    () => { console.log("success")},
    (err) => { /* handle errors */ }
);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/name", name);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));