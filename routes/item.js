const express = require("express");
const router = express.Router();
const _=require("lodash");
const User = require("../models/item");
const userValidation = require("../validation/item");
const bcrypt = require("bcryptjs");


// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
      message: "User"
    });
  });

//@route GET item/all
//@desc Get all usernames
//@access Public
router.get("/all", (req, res) => {
    const errors = {};
    User.find({}, '-email')
    .then(users => {
        if (!users){
            errors.onUsers = "There are no users";
            res.status((404).json(errors))
        }
        res.json(users);
    })
    .catch(err => res.status(404).json({noUsers: "There are no users"}));
});

// @route   GET item/username
// @desc    Get all items from one username
// @access  Public
router.get("/username", (req, res) => {
    const errors = {};
    User.find({'username': req.body.username}, '-email')
      .then(users => {
        if (!users) {
          errors.noUsers = "There are no users";
          res.status(404).json(errors);
        }
        res.json(users);
      })
      .catch(err => res.status(404).json({ noUsers: "There are no users" }));
  });
  
// @route   DELETE item/deleteUsername
// @desc    Delete items from one username
// @access  Public
router.delete("/deleteUser", (req, res) => {
    User.deleteOne({'username': req.body.username})
    .then(({ok, n}) => {
        res.json({ noUsers: "Deleted :)" });
    })
      .catch(err => res.status(404).json({ noUsers: "Can not delete user" }));
  });

//   let errors = {};

//   const email = req.body.email;
//   const id = req.body._id;

//   Item.findById(id).then(item => {

//     bcrypt.compare(email, item.email).then(isMatch => {
//       if (isMatch) {

//         item.remove()
//           .then(() => {
//             res.json({ success: true });
//           })
//           .catch(err =>
//             res.status(404).json({ itemnotfound: "No item found" })
//           );

//       } else {
//         errors.email = "Email Incorrect";
//         return res.status(400).json(errors);
//       }
//     });

//   }).catch

// @route   POST item/addUser
// @desc    Add user
// @access  Public
router.post("/addUser", (req, res) =>{
    const {errors, isValid} = userValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    const user = new User({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.email, salt, (err, hash) =>{
            if (err) throw err;
            user.email = hash;
            user.save()
            .then(() => {
                res.json(user)
            })
            .catch(err => res.status(404).json(err));
        });
    });
});

// @route   PUT item/updateUsername
// @desc    Update items from one username
// @access  Public
router.put("/updateUser", (req, res) => {
    User.replaceOne({'username': req.body.username},
    {'username': req.body.username, 'content': req.body.content})
    .then(({ok, n}) => {
        res.json({ noUsers: "updated :)" });
    })
    .catch(err => res.status(404).json({ noUsers: "User can not be updated" }));
});






















let myArray = [];

//@route Post name/array
//@desc Get everything in the array
//@access Public
router.post("/array", (req, res) => {
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    }
    myArray.push(newItem);
    res.send(myArray);
});

//@route GET name/getNames
//@desc Get all users
//@access Public
router.get("/getNames", (req, res) => { 
    res.send(myArray);
});

//@route GET name/update
//@desc Update a user by index
//@access Public
router.put("/update", (req,res) =>{
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    }
    let index = req.body.index;
    _.set(myArray, index, newItem);
    res.send(myArray)
});

//@route GET name/delete
//@desc delete a user by index number
//@access Public
router.delete("/delete", (req,res) =>{
    let index = req.body.index;
    _.pullAt(myArray, index);
    res.send(myArray)
});

module.exports = router;