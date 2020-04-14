var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('coronamap/index');
});

router.get('/updatestats', function(req, res, next) {
  res.render('coronamap/updatestats');
});

module.exports = router;