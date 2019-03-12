var socket = io();

function saveData() {
    var person = document.getElementById("namePerson").value;
    var address = document.getElementById("email").value;

    if(person == "" || address == ""){
    	document.getElementById("error").innerHTML = "ERROR: All fields must be filled out.";
    }
    else{
    	document.getElementById("error").innerHTML = "";
    }

    var data = {namePerson: person, email: address}


    socket.emit('Data added', data);
}

function showMoisture() {
    socket.emit('Show data');
    
    //use socket.on() to receive arduino data from server???

    document.getElementById("moisture").innerHTML = "NUMBER GOES HERE";
}