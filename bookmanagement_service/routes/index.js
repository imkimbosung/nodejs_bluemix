var express = require('express');
var app = express();
var router = express.Router();
var request = require('request'); // 서버에서 내보낼 때
var mysql = require('mysql'); //sql 선언
// var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Dmb02331',
  database : 'library'
});

/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

/* DATA BASE SELECT */
var sql_select = 'SELECT * FROM book_information WHERE number=?';
router.get('/data/select/:number', function(req, res, next) {
  var params = [req.params.number];
  connection.query(sql_select,params, function(err, rows) {
    if(!err){
      console.log(rows);
      res.send(200, rows);
    } else {
      console.log('Error');
      res.render('index', {title:'Error'});
    }
  });
});

/* DATA BASE UPDATE */
var sql_update = 'UPDATE book_information SET state=? WHERE number=?';
router.get('/data/update/:state', function(req, res,next){
  var params = [req.params.state, 201801];
  connection.query(sql_update, params, function(err, rows, fields){
    if (err) console.log(err);
    // console.log(rows);
    console.log("Record Updated!!  " + req.params.state);
  });
});


/* LED control */
// LED OFF
router.get('/test/:data', function(req, res, next) {
  request.post('http://192.168.0.148/arduino/digital/13/'+ req.params.data);
  // res.send("test" + req.params.data);
  console.log(req.params.data)
});

// LED ON
router.get('/test/:data1', function(req, res, next) {
 request.post('http://192.168.0.148/arduino/digital/13/'+ req.params.data1);
  // res.render('index', { title: 'Express1' });
    console.log(req.params.data)
});

module.exports = router;
