const database = require('./js/databases');

// Populates the designs table
window.onload = function() {
  populateTable();

}

$(function() {
    $('#close').click(function() {
        $('#float_bottom_left').remove();
    });
});

function populateTable() {
  database.getPersons(function(designs) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < designs.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + designs[i].designid + '</td>';      
      tableBody += '  <td>  <a href=" ' + designs[i].csample + '" ><div id="float_bottom_left"><img src=" ' + designs[i].csample + '" id="close "></div></td>';
      tableBody += '  <td>' + designs[i].shade + '</td>';
      tableBody += '  <td>' + designs[i].refcode + '</td>';
      tableBody += '  <td>' + designs[i].percent + '</td>';
      tableBody += '  <td>' + designs[i].gsm + '</td>';
      tableBody += '  <td>' + designs[i].width + '</td>';
      tableBody += '  <td>' + designs[i].cad + '</td>';
      tableBody += '  <td><a href="update.html"><input type="button" class="btn btn-outline-primary" value="Update" onclick="myFunction(\'' + designs[i]._id + '\')"></a></td>'
      tableBody += '  <td><input type="button" class="btn btn-outline-danger" value="Delete" onclick="popupmsg(\'' + designs[i].designid + '\')"></td>'
      tableBody += '</tr>';
    }

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
  if (confirm("Do you want to delete the design")) {
        database.gettest1db(function(books){
        for(i=0;i<books.length;i++){
          if(books[i].designid==id){
            count++;
          }
          else{
            
          }

        }
        if(count==0){
          database.deletePerson(id);
          alert("Design is deleted successfully");
        }
        else{
          alert("Design can not delete it now");
        }
 
        });       

  } else {
  }
}

function deletePerson(id) {
  database.deletePerson(id);

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
    var updateUserid = id;
    localStorage.setItem("designid", updateUserid);
  }
}
