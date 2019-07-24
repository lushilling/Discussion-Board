const express = require("express");
const router = express.Router();
const _=require("lodash");
const users = require("../schema");

let myArray = [];

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
    users.find({username:req.body.username})
      .then(items => {
        if (!items) {
          errors.noItems = "There are no items";
          res.status(404).json(errors);
        }
        res.json(items);
      })
      .catch(err => res.status(404).json({ noItems: "There are no items" }));
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