/**
	Get: Shows all the matches in the db.
**/

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//ONLY Allow access for authenticated user:
var router = require('../auth.js');

var async = require('async');


router.put('/', function(req, res, next) {
  var bets = req.body;

  console.log(req.headers);
  async.each(bets, function(bet, callback) {
    mongoose.model('matchbet').findById(bet._id, function(err, matchbet) {
      matchbet.score = bet.score;
      console.log(bet.score);
      matchbet.mark = bet.mark;
      matchbet.save(function(err) {
        if (err) {
          console.log('matchbet save error');
          callback();
        }
        else {
          console.log('matchbet save success');
          callback();
        }
      });
    });
  });
});

module.exports = router;