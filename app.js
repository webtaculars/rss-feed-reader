var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require ('method-override');
global.path        = require('path');
global.mongoose    = require('mongoose');

var db_url = process.env.MONGOLAB_URI || 'mongodb://localhost/rss';
global.db  = mongoose.connect(db_url);

var app        = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(express.static(__dirname + '/public'));
var feedsController = require(path.join(__dirname, 'feedsController'));

app.get('/feeds', feedsController.index);
app.post('/feeds', feedsController.create);
app.get('/feeds/:id', feedsController.show);
app.delete('/feeds/:id', feedsController.delete);

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Listening on port 8000');
})
