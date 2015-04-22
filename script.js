
var socket = io.connect('http://192.168.1.2:8080');
var question = function(){
	console.log("question");
	document.getElementById("question").innerHTML = "data";
}

socket.on('updateScreen',function(data){
	console.log('displayQuestion');
	document.getElementById("question").innerHTML = data.ques;
	document.getElementById("score").innerHTML = data.score;
	
});

function button1(){
	var user = document.getElementById('name').value;
	console.log('button1');
	socket.emit('clicked',{ans: 1,user: user});
	socket.emit('changeQuestion',{});

}
function button2(){
	var user = document.getElementById('name').value;
	console.log('button2');
	socket.emit('clicked',{ans: 0,user: user});
	socket.emit('changeQuestion',{});
}

