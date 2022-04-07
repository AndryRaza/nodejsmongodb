var express = require("express");

var app = express();

const url = 'mongodb+srv://andry:andry@cluster0.pkqfu.mongodb.net/'
const dbName = 'nodetp';
const person = require('./models/person.js')
const mongoose = require('mongoose');

const personRouter = require('./routes/person')
const teacherRouter = require('./routes/teacher')

mongoose.connect(url + dbName, { useNewUrlParser: true, useUnifiedTopology: true });

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connecté à Mongoose")
});

app.use(express.static("public"));
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

app.get("/", function (request, response) {

    response.render("home");
});

app.use('/',personRouter);
app.use('/teacher',teacherRouter)