var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('underscore');
var mime = require('mime');

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.session.authenticated === true) {
    // ACCESS GRANTED
    console.log('authenticated');
    request('http://tech.vg.no/intervjuoppgave/varnish.log', function (error, response, body) {

      var topFiveHosts = [];                    // Placeholder for top five hosts
      var topFiveFiles = [];                    // Placeholder for top five files

      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      if (error != null ) {

        errors = [{ msg: error}];
        res.render('stats', { flash: { type: 'alert-danger', messages: errors }});

      } else {

        // Temporary arrays
        var hosts = [];
        var files = [];

        // Split into lines
        var logFile = body.split('\n');

        for (var i = 0; i < logFile.length; i++) {
          // Split up lines
          var line = logFile[i].split(' ');

          // Elemt 6 should be the hostname with uri
          var hostElement = line[6];


          if (hostElement != null ){
            //Split up host and strip of PROTOCOL and URL
            var hostname = hostElement.split('/');
            hosts.push(hostname[2]);

            // Only add files with a real mime type to the file array
            if (mime.lookup(_.last(hostname)) != 'application/octet-stream'){
              files.push(_.last(hostname))
            }
          }
        }

        // Sort the results based on occurences
        var sortedFiles = sortArray(files);
        var sortedHosts = sortArray(hosts);

        for (var i = 0; i < 5; i ++) {
          topFiveHosts.push(sortedHosts[i]);      // Create a result array for hosts
          topFiveFiles.push(sortedFiles[i])       // Create a result array for files
        }

      }
      res.render('stats', { title: 'Stats', topHosts: topFiveHosts, topFiles: topFiveFiles });
    });


 } else {
    // ACCESS DENIED

    console.log('not authenticated')
    req.session.authenticated = false;

    // If user is not authenticated, redirect them back to login page
    res.redirect('login');
  }

});

function sortArray(arr) {
    var cnts = arr.reduce( function (obj, val) {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    }, {} );

    //Use the keys of the object to get all the values of the array
    //and sort those keys by their counts
    var sorted = Object.keys(cnts).sort( function(a,b) {
      return cnts[b] - cnts[a];
    });
    return sorted;
}

module.exports = router;
