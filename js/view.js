const database = require('./js/databases');

// Populates the designs table
window.onload = function() {
  populateTable();

}

function populateTable() {
  database.getPersons(function(designs) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < designs.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + designs[i].designid + '</td>';
      // Changes were made here
      tableBody += '  <td>  <img src=" ' + designs[i].uname + '" alt="Picture "></td>';
      tableBody += '  <td>  <a href=" ' + designs[i].uname + '" > <input type="button" class="btn btn-outline-primary" value="Preview" ></td>';
      // end
      tableBody += '  <td>' + designs[i].shade + '</td>';
      tableBody += '  <td>' + designs[i].udept + '</td>';
      tableBody += '  <td>' + designs[i].contperc + '</td>';
      tableBody += '  <td>' + designs[i].gsm + '</td>';
      tableBody += '  <td>' + designs[i].width + '</td>';
      tableBody += '  <td>' + designs[i].uip + '</td>';
      // Changes were made here
      tableBody += '  <td> <a download="'+ designs[i].uname2 + '" href="' + designs[i].uname +'"> <input type="button" class="btn btn-outline-primary" value="Download" ></a></td>';
      // end
      tableBody += '  <td><a href="update.html"><input type="button" class="btn btn-outline-primary" value="Update" onclick="myFunction(\'' + designs[i]._id + '\')"></a></td>'
      tableBody += '  <td><input type="button" class="btn btn-outline-danger" value="Delete" onclick="popupmsg(\'' + designs[i].designid + '\')"></td>'
      tableBody += '</tr>';
    }
    //

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
    $(document).ready(function() {
      var t = $('#bootstrap-data-table').DataTable({});
    });
    $.fn.dataTable.ext.errMode = 'none';

    $('#tablebody').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });

  });
}
function popupmsg(id) {
  console.log(id);
  var txt;
  var count =0;
  if (confirm("Do you want to delete the user")) {
        database.getissuedbook(function(books){
        for(i=0;i<books.length;i++){
          if(books[i].designid==id){
            count++;
          }
          else{
            
          }

        }
        if(count==0){
          database.deletePerson(id);
          alert("User is deleted successfully");
        }
        else{
          alert("User has book issued, can not delete it now");
        }
 
        });       
    // var errorMsg = document.getElementById("msg");
            //errorMsg.innerHTML = "Success: Book is deleted successfully";
            //errorMsg.style.color = "Green";
  } else {
   // txt = "You pressed Cancel!";
  }
  //document.getElementById("demo").innerHTML = txt;
}
// Retrieve the designs
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
  div.innerHTML = '<input type="button" onclick="updatePerson(\'' + id + '\')">';
}

function myFunction(id) {

  if (typeof(Storage) !== "undefined") {
    var updateDesignid = id;
    localStorage.setItem("designid", updateDesignid);
  }
}
