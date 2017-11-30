var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// not using the middleware for now
// var multer = require('multer');
var fs = require('fs');

// module to get ip address
// var ip = require('ip');
var ip = require('./utils/ip');
var my_ip = new ip();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({
//   dest: './uploads'
// }));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

var tip = "欢迎";

var filter = require('./utils/filter');
var my_filter = new filter('./utils/sensitive.txt');

app.get('/', function(req, res) {
  res.render('main', { title: '流言蜚语', header: '流言蜚语', tip: tip });
});

app.post('/send', function(req, res) {
  // check the message received
  if(my_filter.test(req.body.message)) {
    // sensitive
    tip = 'Big brother is watching you!';
  }
  else {
    // not sensitive
    console.log(req.body.message);
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

var port = 8080;

var ip_addr = my_ip.getAddress();
app.listen(port, ip_addr, function(err){
  if(err) {
    console.error(err);
  } else {
    console.info("成功启动，请在平板上打开浏览器，在地址栏输入http://%s:%s", ip_addr, port);
  }
});
