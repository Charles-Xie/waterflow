var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// not using the middleware for now
// var multer = require('multer');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({
//   dest: './uploads'
// }));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('main', {title: 'Main', header: 'Please write something here'});
});

app.post('/send', function(req, res) {
  console.log(req.body.message);
  // res.json(req.body);
  fs.appendFile('message.txt', req.body.message + '\n', function(err) {
    if(err) {
      throw err;
      console.log('The message %s was appended', req.body.message);
    }
  });
  // res.render('main', {title: 'Main', header: 'Please write something here'});
  res.redirect('/');
});

port = 8080;
// ip = "192.168.1.108";
ip = "192.168.1.100";
app.listen(port, ip, function(err){
  if(err) {
    console.error(err);
  } else {
    console.info("Server started successfully, listening at http://%s:%s", ip, port);
  }
});
