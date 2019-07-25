const express = require("express");
const router = express.Router();
const _=require("lodash");
const user = require("../models/schema");

let myArray = [];

// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
      message: "Username"
    });
  });

//@route GET name/all
//@desc Get all usernames
//@access Public
router.get("/all", (req, res) => {
    const errors = {};
    users.find()
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
    users.find({'username': req.body.username})
      .then(users => {
        if (!users) {
          errors.nousers = "There are no users";
          res.status(404).json(errors);
        }
        res.json(users);
      })
      .catch(err => res.status(404).json({ nousers: "There are no users" }));
  });
  
// @route   DELETE name/deleteUsername
// @desc    Delete items from one username
// @access  Public
router.delete("/deleteUsername", (req, res) => {
    users.deleteOne({'username': req.body.username})
    .then(({ok, n}) => {
        res.json({ nousers: "Deleted :)" });
    })
      .catch(err => res.status(404).json({ nousers: "Can not delete user" }));
  });

// @route   POST name/addUser
// @desc    Add user
// @access  Public
router.post("/addUser", (req, res) =>{
    const newUser = new users({
        username: req.body.username,
        context: req.body.content
    });
    newUser.save()
    .then(()=> {
        res.json(users);
         console.log('complete')
    })
    .catch(err => res.status(404).json({ newUser: "User couldn't be added" }));
});

// @route   PUT name/updateUsername
// @desc    Update items from one username
// @access  Public
router.put("/updateUser", (req, res) => {
    users.replaceOne({'username': req.body.username},
    {'username': req.body.upUsername, 'content': req.body.upContent})
    .then(({ok, n}) => {
        res.json({ nousers: "updated :)" });
    })
    .catch(err => res.status(404).json({ nousers: "User can not be updated" }));
});
























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