var express = require('express');
var router = express.Router();

/* Register user */
router.post('/', function(req, res, next) {

  // validate the input
  req.checkBody('firstname', 'First Name is required').notEmpty();
  req.checkBody('lastname', 'Last Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    res.render('register', { flash: { type: 'alert-danger', messages: errors }});
  }
  else {
    // Register user
    // Data should be placed in API or DB
    /*
    Example:
    create database task;

    CREATE TABLE `user` (
      `firstname` varchar(50) NOT NULL,
      `lastname` varchar(50) NOT NULL,
      `email` varchar(150) NOT NULL,
      `password` varchar(150) NOT NULL,
      PRIMARY KEY  (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    */

    req.session.email = req.body.email;
    req.session.password = req.body.password;

    res.redirect('login');
  }

});

module.exports = router;
