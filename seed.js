const mongoose = require('mongoose');
require('dotenv').config();

const lesson = require('./models/lesson')
const teacher = require('./models/teacher')

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))


const lessons = [
    {
        name: 'Dev c#',
        person: '624e88d66ed2d0afd0e5e662'
    },
    {
        name: 'Dev Java',
        person: '624e88d66ed2d0afd0e5e662'
    },
    {
        name: 'Dev Javascript',
        person: '624e88d66ed2d0afd0e5e662'
    },
    {
        name: 'Dev Python',
        person: '624e88d66ed2d0afd0e5e662'
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
    await lesson.deleteMany({});
    await lesson.insertMany(lessons);

    // await teacher.deleteMany({});
    // await teacher.insertMany(teachers);
}

seedDB().then(() => {
    mongoose.connection.close();
})