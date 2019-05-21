var socket = io();

socket.on('empty', function () {
	//loading gif appears in website
	document.getElementById("lineGIF").src = "load.gif";
});

socket.on('someone', function () {
	//loading gif disappears
	document.getElementById("lineGIF").src = "";
});