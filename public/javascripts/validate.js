$(function() {


      // cache references to input controls
      var password = $('#password');
      var confirmPassword = $('#confirm-password');
      var email = $('#email');

      // validate the login form before submit
      $("#login-form").kendoValidator({
        rules: {

        },
        messages: {
          email: 'That doesn\'t appear to be a valid email address'
        }
      });


      // validate the register form before submit
      $("#register-form").kendoValidator({

        rules: {

          passwordMatch: function(input) {

            // passwords must match

            if (input.is('#confirm-password')) {
              return $.trim(password.val()) === $.trim(confirmPassword.val());
            }

            return true;

          }

        },
        messages: {

          // custom error messages. email gets picked up
          // automatically for any inputs of that type

          passwordMatch: 'The passwords don\'t match',
          emailValid: 'The email addresses is not valid',
          email: 'That doesn\'t appear to be a valid email address'

        }

      }).data('kendoValidator');

    });