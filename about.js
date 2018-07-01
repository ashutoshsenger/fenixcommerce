   var express = require('express');
   var path = require('path');

  //router object
  var router = express.Router();

  router.get('/publication', function(req, res){
    res.sendFile(path.join(__dirname, '..', '/html/about.html'));
  });

  module.exports = router;