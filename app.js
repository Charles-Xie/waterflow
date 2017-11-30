var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// not using the middleware for now
// var multer = require('multer');
var fs = require('fs');

// module to get ip address
var ip = require('ip');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({
//   dest: './uploads'
// }));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

var tip = "欢迎";

var filter = require('./utils/filter.js');

app.get('/', function(req, res) {
  res.render('main', { title: '流言蜚语', header: '流言蜚语', tip: tip });
});

app.post('/send', function(req, res) {
  console.log(req.body.message);
  // check the message received
  if(filter.test(req.body.message)) {
    // sensitive
    tip = 'Big brother is watching you!';
  }
  else {
    // not sensitive
    fs.appendFile('message.txt', req.body.message + '\n', function (err) {
      if (err) {
        throw err;
        console.log('The message %s was appended', req.body.message);
      }
    });
    tip = '发送成功!';
  }
  res.redirect('/');
});

port = 8080;

ip_addr = ip.address();
app.listen(port, ip_addr, function(err){
  if(err) {
    console.error(err);
  } else {
    console.info("Server started successfully, listening at http://%s:%s", ip_addr, port);
  }
});
