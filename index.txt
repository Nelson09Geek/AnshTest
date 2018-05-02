//https://webide-p1942481896trial.dispatcher.hanatrial.ondemand.com/
//***********************************Index.js file for Ans***********************************

'use strict';

//******Express,helmet,bodyparser and cors Library for Creating And Listening Server********************
var express = require('express');
var cors = require('cors');
var helmet = require('helmet');
var bodyParser=require('body-parser');
var app = express();

app.options('*', cors());
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/public/'));
var server=app.listen(process.env.PORT || 3000,function(session){ //express server listening on 3000 port
  console.log("Started on PORT 3000");
});
//*******************************************************************************************


//**************************Connecting the MongoDB Database***********************************
var database="";
var MongoClient = require('mongodb').MongoClient;
var mongo=require('mongodb'); // for converting string to ObjectID
MongoClient.connect("mongodb://localhost:27017/ansh", function(err, db) {
  if(!err) {
    console.log("We are connected with MongoDB");
  }
  else {
    console.log(err);
  }
  database=db;
});
//*********************************************************************************************



//***************************************API section*******************************************

////Login check api
app.post('/getTasks',function(req,res){
	
	res.header("Access-Control-Allow-Origin","*");
	database.collection('tasktable').find({},{"sort":{$natural:-1}}).toArray(function(err,thresholds){
			if(err){
				console.log(err);
				res.json({"flag":"error"});
			}
			else{
				console.log(thresholds);
				
					res.json(thresholds);
				
			}
			
		});
		
});

//////Profile api
app.post('/addTasks',function(req,res){
	
	res.header("Access-Control-Allow-Origin","*");
	var jsonData={};
	jsonData.name=req.body.name;
	jsonData.description=req.body.description;	
	jsonData.task_status="In Progress";
	jsonData.task_status_color="Success",
	jsonData.creation_date=new Date();
	jsonData.task_urgency=req.body.task_urgency;
		if(req.body.task_urgency=="Critical")
		{
			jsonData.task_urgency_color="Error"
		}
		else if(req.body.task_urgency=="Medium")
		{
			jsonData.task_urgency_color="Warning"
		}
		else if(req.body.task_urgency=="Low")
		{
			jsonData.task_urgency_color="None"
		}

	database.collection('tasktable').insert(jsonData,function(err,result){
		
			if(err){
				console.log(err);
				res.json({"flag":"error"});
			}
			else{
				console.log(result);
				res.json({"flag":"success"});
			}
	
	});
			
		
		
});
app.post('/deleteTasks',function(req,res){
	
	res.header("Access-Control-Allow-Origin","*");
	var jsonData={};
	
	 var _id=new mongo.ObjectID(req.body.id);
	console.log(req.body.id);	

	database.collection('tasktable').remove({"_id":_id},function(err,result){
		
			if(err){
				console.log(err);
				res.json({"flag":"error"});
			}
			else{
				console.log(result.result.n);
				res.json({"flag":"success"});
			}
	
	});
			
		
		
});

app.post('/updateTasks',function(req,res){
	
	res.header("Access-Control-Allow-Origin","*");
	var jsonData={};
	
	 var _id=new mongo.ObjectID(req.body.id);
	console.log(req.body.id);	

	database.collection('tasktable').update({"_id":_id},{$set:{"task_status":req.body.task_status,"task_status_color":"None"}},function(err,result){
		
			if(err){
				console.log(err);
				res.json({"flag":"error"});
			}
			else{
				console.log(result);
				res.json({"flag":"success"});
			}
	
	});
			
		
		
});
