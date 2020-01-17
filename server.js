
var express = require("express");
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var routes = require("./routes/index")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', routes.flatpacks);
app.use('/public', express.static(__dirname + '/Server/public/quotations'));

app.listen(port, () => {
    console.log("Server started on port " + port);
});
