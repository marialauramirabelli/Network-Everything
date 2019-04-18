var socket = io();

function saveData() {
    var person = document.getElementById("namePerson").value;
    var address = document.getElementById("email").value;

    if(person == "" || address == ""){
    	document.getElementById("error").innerHTML = "ERROR: All fields must be filled out.";
    }
    else{
    	document.getElementById("error").innerHTML = "If you don't receive a confirmation email within the next 5 minutes, resubmit your name and email.";

    	var data = {namePerson: person, email: address}
    	socket.emit('dataAdded', data);
    }

    document.getElementById("form").reset();
}

function sendEmail(){
    socket.emit('email');
}

// function water(){
//     socket.emit('waterPlant');
// }

socket.on('water', function (values) {
	var data = values;
    var mappingHue = data*(120/255);
    var mappingWidth1 = data*(100/255);
    var mappingWidth2 = 100 - data*(100/255);
    var displayData = Math.round(mappingWidth1);
    document.getElementById("moisture").innerHTML = displayData+"%";
    document.getElementById("spectrum1").style.backgroundColor = "hsl("+mappingHue+",100%,50%)";
    document.getElementById("spectrum1").style.width = mappingWidth1+"%";
    document.getElementById("spectrum2").style.width = mappingWidth2+"%";
    if (displayData > 70) {
      document.getElementById("succ").src = "succ1.png";
    }
    else if (displayData > 30) {
      document.getElementById("succ").src = "succ2.png";
    }
    else{
      document.getElementById("succ").src = "succ3.png";
    }
    
});