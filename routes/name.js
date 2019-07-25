const express = require("express");
const router = express.Router();
const _=require("lodash");
const User = require("../models/schema");

// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
      message: "User"
    });
  });

//@route GET name/all
//@desc Get all usernames
//@access Public
router.get("/all", (req, res) => {
    const errors = {};
    User.find()
    .then(users => {
        if (!users){
            errors.onUsers = "There are no users";
            res.status((404).json(errors))
        }
        res.json(users);
    })
    .catch(err => res.status(404).json({noUsers: "There are no users"}));
});

// @route   GET name/username
// @desc    Get all items from one username
// @access  Public
router.get("/username", (req, res) => {
    const errors = {};
    User.find({'username': req.body.username})
      .then(users => {
        if (!users) {
          errors.noUsers = "There are no users";
          res.status(404).json(errors);
        }
        res.json(users);
      })
      .catch(err => res.status(404).json({ noUsers: "There are no users" }));
  });
  
// @route   DELETE name/deleteUsername
// @desc    Delete items from one username
// @access  Public
router.delete("/deleteUsername", (req, res) => {
    User.deleteOne({'username': req.body.username})
    .then(({ok, n}) => {
        res.json({ noUsers: "Deleted :)" });
    })
      .catch(err => res.status(404).json({ noUsers: "Can not delete user" }));
  });

// @route   POST name/addUser
// @desc    Add user
// @access  Public
router.post("/addUser", (req, res) =>{
    const user = new User({
        username: req.body.username,
        content: req.body.content
    });
    user.save()
    .then(()=> {
        res.json(user);
         console.log('complete')
    })
    .catch(err => res.status(404).json({ noUsers: "User couldn't be added" }));
});

// @route   PUT name/updateUsername
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