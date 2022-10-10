var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;



app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');

//global variable for tweet data
var tweetinfo = []
//global variable for tweets searched
var tweetSearched = [] 

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo=JSON.parse(data)
  }
});
 

//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo:tweetinfo});
});


//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo:tweetinfo});
});


//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({tweetSearched:tweetSearched});
});


//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var tweetId = req.body.id;
  var tweetText = req.body.text;
  const currentDate = Date(Date.now());
  
  tweetinfo.push({
      id: Number(tweetId),
      text: tweetText,
      created_at: currentDate
  });
  res.send('Successfully created a tweet!');
});


//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  var tweetId = req.body.id;
  var found = false;
  const currentDate = Date(Date.now());
  
  //go through each element in the array
  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.id === Number(tweetId)) {
       tweetSearched.push({
         id: Number(tweetId),
         text: tweet.text,
         created_at: currentDate
     });
  }
 });
  res.send('Successfully searched a tweet!');
});


//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var id = req.params.nm;
  var newName = req.body.newName;
  var found = false;

  tweetinfo.forEach(function(tweet, index) {
      if (!found && tweet.user.name === (id)) {
          tweet.user.screen_name = newName;
      }
  });
  res.send('Succesfully updated product!');
});


//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id = req.params.tweetid;
  var found = false;

  tweetinfo.forEach(function(tweet, index) {
      if (!found && Number(tweet.id) === Number(id)) {
          tweetinfo.splice(index, 1);
      }
   });
  res.send('Successfully deleted product!');
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});