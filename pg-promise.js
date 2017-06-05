var promise = require("bluebird");
var pgp = require('pg-promise')({
  promiseLib: promise
  // initialization options
});
var db = pgp({database: 'restaurant'});

db.query('SELECT * FROM restaurant')
  .then(function (results) {
    results.forEach(function (r) {
      console.log(r.id, r.name, r.address, r.category);
    });

    return db.one("SELECT * FROM restaurant WHERE name='Restaurant 1'");
  })
  .then(function(row){
    console.log(row);

    return db.result("INSERT INTO restaurant VALUES(default, 'Narf')");
  })
  .then (function(result){
    console.log(result);
  })

  .catch(function(error){
    console.error(error);
  })
  .finally(function(){
    pgp.end();
  })
