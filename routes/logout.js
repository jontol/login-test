var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.session.authenticated = false;

  res.redirect('login');
});



module.exports = router;
