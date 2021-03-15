// Initialize the database
var Datastore = require('nedb');

db2 = new Datastore({
  filename: 'db/designs.db',
  autoload: true
});

// Adds a design
exports.addPerson = function(designid, uname, shade, refcode, contperc, gsm, width,  uip) {

  // Create the design object
  var design = [{
    "designid": designid,
    "uname": uname,
    "shade": shade,
    "refcode": refcode,
    "contperc": contperc,
    "gsm": gsm,
    "width": width,
    "uip": uip
  }];

  // Save the design to the database
  db2.insert(design, function(err, newDoc) {
    // Do nothing
  });
};




// Returns all designs
exports.getPersons = function(fnc) {

  // Get all designs from the database
  db2.find({}, function(err, docs) {

    db2.find({
      _id: fnc
    }, {}, function(err, findUpdate) {

    });


    // Execute the parameter function
    fnc(docs);
  });
}




// Deletes a design
exports.deletePerson = function(id) {

  db2.remove({
    design: id
  }, {}, function(err, numRemoved) {
    // Do nothing
  });
}



// Updates a design

// Update a design
exports.update = function(id, {
  designid,
  uname,
  shade,
  refcode,
  contperc,
  gsm,
  width,
  uip
}) {
  db2.update({
    designid: id
  }, {
    designid: designid,
    uname: uname,
    shade: shade,
    refcode: refcode,
    contperc: contperc,
    gsm: gsm,
    width: width,
    uip: uip
  }, {}, function(err, numReplaced) {
    // numReplaced = 1
    // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
    // Note that the _id is kept unchanged, and the document has been replaced
    // (the 'system' and inhabited fields are not here anymore)
  });
}

exports.issueabook = function(bookid,designid, uname, issued_date, renew_date) {
  //create the book object
  var issuedbook = [{
    "bookid": bookid,
    "designid": designid,
    "uname": uname,
    "issued_date": issued_date,
    "renew_date": renew_date,

  }];
  //save the book to the database
  db1.insert(issuedbook, function(err, newDoc) {

    //do nothing
  })


};
exports.bookcount = function(fnc) {

  db.count({}, function(err, count) {

    //console.log(count);
    localStorage.setItem("bookcount", count);




  });




};
exports.usercount = function(fnc) {

  db2.count({}, function(err, count) {

    //console.log(count);
    localStorage.setItem("usercount", count);




  });




};
exports.issuedbookcount = function(fnc) {

  db1.count({}, function(err, count) {

    //console.log(count);
    localStorage.setItem("issuedbook", count);




  });




};
