var express = require("express");

var app = express();

const person = require('./models/person.js')
const mongoose = require('mongoose');

const personRouter = require('./routes/person');
const teacherRouter = require('./routes/teacher');
const lessonRouter = require('./routes/lesson');

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.use('/teachers',teacherRouter);
app.use('/lessons',lessonRouter)
