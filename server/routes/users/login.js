var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/user/login', function(req, res, next) {
  const QUERY = req.body
  const email = req.body.email
  const password = req.body.password
  const queryUsers = req.db.from('users').select('*').where("email", '=', email)

  //Verify body
  if(!QUERY.hasOwnProperty('email') || !QUERY.hasOwnProperty('password')) {
    res.status(400).json({error: true, message: `Bad Request`})
    return
  } else {
    queryUsers.then((users) => {
      if (users.length === 0) {
        res.status(401).json({error: true, message: `Unauthorized`})
        return
      } else {
        const user = users[0]
        return bcrypt.compare(password, user.hash)
      }
    })
    .then((match) => {
      if(match !== undefined && !match) {
        res.status(401).json({message: `Unauthorized`})
        return
      } else if (match !== undefined && match){
        // Create and return JWT token
        const secretKey = "secret key"
        const expires_in = 60 * 60 * 24 // 1 Day
        const exp = Date.now() + expires_in * 1000
        const token = jwt.sign({email, exp}, secretKey)
        res.json({token_type: "Bearer", token, expires_in, Authorization: `Bearer ${token}`}) 
      }
    })
  }
  
});

module.exports = router;