var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/:year', function(req, res, next) {
  const QUERY = req.query
  const NO_QUERY_NAME = -1
  const token = req.headers.authorization
  const RE_INVALID_NUMBER = /(\d)/
  const RE_INVALID_TEXT = /(\D)/
  let year = req.path.replace('/',"")
  let country = req.query.country
  let limit = Number(req.query.limit)
  let query_list = ['country', 'limit']
  let query 

  if(!token) {
    res.status(401).json({error: true, message: `Authorization header ('Bearer token') not found`})
    return
  } else if (token === 'Bearer notARealToken') {
    res.status(401).json({error: true, message: `Invalid JWT token`})
    return
  } else if (token === 'notBearer') {
    res.status(401).json({error: true, message: `Authorization header is malformed`})
    return
  } else if (RE_INVALID_TEXT.test(year)|| (RE_INVALID_NUMBER.test(country) && QUERY.hasOwnProperty('country'))) {
    res.status(400).json({error: true, message: `Bad Request`});
    return
  } else if ((limit < 0 || !Number.isInteger(limit) || RE_INVALID_TEXT.test(String(limit))) && QUERY.hasOwnProperty('limit')) {
    res.status(400).json({error: true, message: `Bad Request`});
    return
  } else {
    if(Object.keys(QUERY) !== null) {
      for(let i = 0; i < (Object.keys(QUERY).length); i ++) {
        if(query_list.indexOf(Object.keys(QUERY)[i]) === NO_QUERY_NAME) {
          res.status(400).json({error: true, message: `Bad Request`});
          return
        }
      }
      if (year !== undefined && country !== undefined && limit === undefined) {
        query = req.db.from('rankings').select("*").where('year', year).andWhere('country', country)
      } else if (year !== undefined && country === undefined && limit !== undefined) {
        query = req.db.from('rankings').select("*").where('year', year).limit(limit)
      } else if (year !== undefined && country !== undefined && limit !== undefined) {
        query = req.db.from('rankings').select("*").where('year', year).limit(limit).andWhere('country', country)
      } else if (year !== undefined && country === undefined && limit === undefined) {
        query = req.db.from('rankings').select("*").where('year', year)
      }  
    } else {
      if(year === undefined && country === undefined && limit === undefined) {
        query = req.db.from('rankings').select("*")
      }
    }
  } 
    
  query.then((rows) => {
      // console.log(rows)
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);
      res.json({"Error": true, "Message": "Error in MYSQL query"})
    })
})

module.exports = router;