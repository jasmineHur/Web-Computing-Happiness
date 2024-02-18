var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/user/register', function(req, res, next) {
  const QUERY = req.body
  const email = req.body.email
  const password = req.body.password
  //Verify body
  if(!QUERY.hasOwnProperty('email') || !QUERY.hasOwnProperty('password')) {
    res.status(400).json({error: true, message: `Bad Request`})
    return
  }
  const queryUsers = req.db.from('users').select('*').where("email", '=', email)
  queryUsers.then((users) => {
    if (users.length > 0) {
      console.log("User already exists");
      return
    }
    // Insert into DB
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds)
    return req.db.from("users").insert({email, hash})
  }).then(() => {
    res.status(201).json({message: "Created"})
  })
});

module.exports = router;