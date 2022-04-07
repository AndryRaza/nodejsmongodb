const mongoose = require('mongoose');
require('dotenv').config();

const url = 'mongodb+srv://andry:andry@cluster0.pkqfu.mongodb.net/'
const dbName = 'nodetp';
const course = require('./models/course')
const teacher = require('./models/teacher')

mongoose.connect(url + dbName)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))


const courses = [
    {
        name: 'Dev c#',
        person: '624d3408f2439b40ee56356c'
    },
    {
        name: 'Dev Java',
        person: '624d3408f2439b40ee56356c'
    },
    {
        name: 'Dev Javascript',
        person: '624d3408f2439b40ee56356c'
    },
    {
        name: 'Dev Python',
        person: '624d3408f2439b40ee56356c'
    },
]

const teachers = [
    {
        name: 'Teacher one'
    },
    {
        name: 'Teacher two'
    },
    {
        name: 'Teacher three'
    },
    {
        name: 'Teacher four'
    },

]

const seedDB = async () => {
    await course.deleteMany({});
    await course.insertMany(courses);

    await teacher.deleteMany({});
    await teacher.insertMany(teachers);
}

seedDB().then(() => {
    mongoose.connection.close();
})