
var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  const QUERY = req.query
  const RE_INVALID_TEXT = /(\d)/
  let year = QUERY.year
  let country = QUERY.country
  let query 

  if(Object.keys(QUERY).length > 2) {
    res.status(400).json({ message: `Bad Request` }); 
    return
  } else if ((!RE_INVALID_TEXT.test(year) && QUERY.hasOwnProperty('year'))|| (RE_INVALID_TEXT.test(country) && QUERY.hasOwnProperty('country'))) {
    res.status(400).json({error: true, message: `Bad Request`});
    return
  } else {
    if(!QUERY.hasOwnProperty('year') && !QUERY.hasOwnProperty('country')) {
      query = req.db.from('rankings').select("rank", "country", "score", "year").orderBy('year', 'desc')
    } else if (QUERY.hasOwnProperty('year') && !QUERY.hasOwnProperty('country')) {
      query = req.db.from('rankings').select("rank", "country", "score", "year").where('year', year).orderBy('year', 'desc')
    } else if (!QUERY.hasOwnProperty('year') && QUERY.hasOwnProperty('country')) {
      query = req.db.from('rankings').select("rank", "country", "score", "year").where('country', country).orderBy('year', 'desc')
    } else if (QUERY.hasOwnProperty('year') && QUERY.hasOwnProperty('country')) {
      query = req.db.from('rankings').select("rank", "country", "score", "year").where('country', country).andWhere('year', year).orderBy('year', 'desc')
    }
  }

  query.then((rows) => {
    res.json(rows)
    return
  })
  .catch((err) => {
    res.status(400).json({ message: `Bad Request` }); 
    return
  })
})

module.exports = router;