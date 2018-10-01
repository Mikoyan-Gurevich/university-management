'use strict';

const error = require('./error');
const respond = require('./respond');
const student = require('./student');
const classes = require('./classes');

module.exports = function (app) {

    app.get('/students', student.getStudent, respond, error);

    app.post('/students', student.createStudent, respond, error);

    app.get('/students/:id', student.getSingleStudent, respond, error);

    app.get('/students/:id/classes', student.studentWithSemester, respond, error);

    app.patch("/students/:id", student.updateName, respond, error);

    app.delete('/students/:id', student.deactivateStudent, respond, error);

    app.get('/classes', classes.getClasses, respond, error);

    app.post('/classes/:id/students', classes.addStudentsToClass, respond, error);

};
