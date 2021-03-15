const database = require('./js/databases');

window.onload = function() {

  // Populate the table
  //populateTable();

  // Add the add button click event
  document.getElementById('useradd').addEventListener('click', () => {

    // Retrieve the input fields
    var designid =document.getElementById('did').value;
   
    //var regexp= new RegExp("^\d*\.?\*$");
    var uname = document.getElementById('uname');
    var shade = document.getElementById('shade');
    var refcode = document.getElementById('refcode');
    var contperc = document.getElementById('contperc');
    var gsm = document.getElementById('gsm');
    var width = document.getElementById('width');
    var uip = document.getElementById('uip');
    var count = 0;
     //check designid is listed already or not
     database.getPersons(function(designs){
      for(i=0;i<designs.length;i++){
        if(designs[i].designid!=designid){
          count++;
        }
        else{

        }
      }
     // console.log(typeof(NaN));
      
        if (designid!== "" && uname.value !== "" && count==designs.length) {
          console.log(typeof(designid));
          database.addPerson(designid, uname.value, shade.value, refcode.value, contperc.value, gsm.value, width.value, uip.value);
          var successMsg = document.getElementById("msg");
          successMsg.innerHTML = "SUCCESS: Design Added Successfully";
          successMsg.style.color = "green";
        } else {
          
          if(count!=designs.length){
            var errorMsg = document.getElementById("msg");
            errorMsg.innerHTML = "ERROR: DesignId is already listed";
            errorMsg.style.color = "Red";
          }
          else{
            var errorMsg = document.getElementById("msg");
            errorMsg.innerHTML = "ERROR: Please Fill Up All Fields";
            errorMsg.style.color = "Red";
          }
         
        }  
      // Reset the input fields
      designid.value = '';
      uname.value = '';
      shade.value = '';
      refcode.value='';
      contperc.value='';
      gsm.value = '';
      width.value = '';
      uip.value = '';
  
      // Repopulate the table
      // populateTable();



     })
    // Save the design in the database if form value is not blank
    
  });
}

// Populates the designs table
function populateTable() {

  // Retrieve the designs
  database.getPersons(function(designs) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < designs.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + designs[i].designid + '</td>';
      tableBody += '  <td>' + designs[i].uname + '</td>';
      tableBody += '  <td>' + designs[i].shade + '</td>';
      tableBody += '  <td>' + designs[i].refcode + '</td>';
      tableBody += '  <td>' + designs[i].contperc + '</td>';
      tableBody += '  <td>' + designs[i].gsm + '</td>';
      tableBody += '  <td>' + designs[i].width + '</td>';
      tableBody += '  <td>' + designs[i].uip + '</td>';

      tableBody += '  <td><input type="button" value="Update" onclick="editPerson(\'' + designs[i]._id + '\')"></td>'
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + designs[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }
    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
    $(document).ready(function() {
      var t = $('#bootstrap-data-table').DataTable({});
    });

  });
}

// Deletes a design
function deletePerson(id) {

  // Delete the design from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}

// edit against _id
function editPerson(id) {
  edit(id);
}

// create a html form and save it
function edit(id) {
  var div = document.createElement("div");
  div.style.width = "100px";
  div.innerHTML = '<input type="button" class="btn btn-outline-primary" onclick="updatePerson(\'' + id + '\')">';
}
