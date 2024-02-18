
var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  req.db.from('rankings').distinct('country').orderBy('country').pluck('country')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);
      res.json({"Error": true, "Message": "Bad Request"})
    })
})

module.exports = router;