var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/user/:id/profile', function(req, res, next) {
  const QUERY = req.query
  const token = req.headers.authorization
  let urlId = String(req.params.id);
  let query
  console.log(req.params.id)
  console.log(req.headers)
  console.log(req.token)
  console.log(urlId)
  if(!token) {
    res.status(404).json({error: true, message: `Not Found`})
    return
  } else if (token !== urlId) {
    res.status(404).json({error: true, message: `Not Found`})
  } 
    
  query.then((rows) => {
      console.log(rows)
      
      if(rows === []) {
        res.status(404).json({error: true, message: `Not Found`})
      } else {
        res.json(rows)
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({"Error": true, "Message": "Error in MYSQL query"})
    })
})

module.exports = router;