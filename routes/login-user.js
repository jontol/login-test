var express = require('express');
var router = express.Router();

/* Register user */
router.post('/', function(req, res, next) {

  // validate the input
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  // check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    res.render('login', { flash: { type: 'alert-danger', messages: errors }});
  }
  else {

    console.log('check email '+ req.session.email + ' and password ' + req.session.password);
    // Check if
    if (req.session.email == null || req.session.password == null ) {

      errors = [{ msg: 'User not found'}];
      res.render('login', { flash: { type: 'alert-danger', messages: errors }});

    // Found a user object - check if credentials match
    } else {

      // Here would be natural to use a DB / API to verify the user - now I only used session based authentication
      if (req.body.email == req.session.email && req.body.password == req.session.password) {

        req.session.authenticated = true;
        res.redirect('stats');

      } else {

        req.session.authenticated = false;

        errors = [{ msg: 'Access Denied!'}];
        res.render('login', { flash: { type: 'alert-danger', messages: errors }});

      }
    }

  }

});

module.exports = router;
