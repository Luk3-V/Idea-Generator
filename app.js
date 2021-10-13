const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const {load} = require('./main/generator');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.listen(app.get('port'), function() {
	console.log('Server started on port ' + app.get('port'));
	load();
	console.log('Word data loaded');
});