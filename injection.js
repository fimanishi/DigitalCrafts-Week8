var promise = require("bluebird");
var pgp = require('pg-promise')({
  promiseLib: promise
  // initialization options
});
var db = pgp({database: 'restaurant'});

var name = "Big Belly Burger";
var query = `INSERT INTO restaurant VALUES(default, '$1')`;

console.log(query);

db.result(query, name)
  .then(function(result){
    console.log(result);
  });
