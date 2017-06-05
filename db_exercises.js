var promise = require("bluebird");
var pgp = require('pg-promise')({
  promiseLib: promise
  // initialization options
});
var db = pgp({database: 'music'});

var prompt = require("prompt-promise");
var result = {};

prompt("Album name? ")
  .then(function (val){
    result["name"] = val;
    return prompt("Album year? ");
  })
  .then(function (val){
    result["year"] = parseInt(val);
    return prompt("Artist ID? ");
  })
  .then(function(val){
    result["artist_id"] = parseInt(val);
    return db.result("INSERT INTO album VALUES(default, ${name}, ${artist_id}, ${year})", result);
  })
  .then(function(result){
    return db.one("SELECT * FROM album ORDER BY ID DESC LIMIT 1");
  })
  .then(function(r){
    console.log("Created album with ID", r.id);
  })
  .catch(function (error){
    console.error(error);
    pgp.end();
  })
  .finally(function (){
    pgp.end();
  });
