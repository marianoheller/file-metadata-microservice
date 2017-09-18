'use strict';

const dirUploads = 'uploads/';

var express = require('express');
var cors = require('cors');

var multer  = require('multer')
var upload = multer({ dest: dirUploads })
var rimraf = require('rimraf');
var fs = require('fs');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  rimraf( dirUploads, function () { 
    if (!fs.existsSync(dirUploads)) fs.mkdirSync(dirUploads);
    res.status(200).json( {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    })
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
