var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets,
	score1 = 0,
	score2 = 0,
	ques,
	answer,
	x = 0;

mongo.connect('mongodb://192.168.1.2/rango',function(err,db){
	if(err) throw err;

	client.on('connection',function (socket) {
		console.log("Someone has connected");

		var col = db.collection('questions');

		socket.on('changeQuestion',function(){
			console.log("changeQuestion");
			col.find().limit(100).sort({_id: 1}).toArray(function(err,res){
				if(err) throw err;
				x = Math.floor((Math.random() * 7) + 0);
				console.log(x);
				ques = res[x].ques;
				answer = res[x].ans;
				client.emit('updateScreen',{ques: ques,score: "score 1: "+score1+", score 2: "+score2});
			});
		});


		socket.on('clicked', function(data)
		{
			console.log(data.user+" clicked"+ data.ans);
			if(data.ans == answer){
				if(data.user == 1)
					score1++;
				else
					score2++;
			}
			console.log("score 1: "+score1+", score 2: "+score2);

		});
	});
});