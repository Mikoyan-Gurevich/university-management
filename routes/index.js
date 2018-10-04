const express = require('express');
const queries = require('../queries/index');
const validate = require('express-validation');
var validation = require('../validations/index');

const router = express.Router();

router.get('/students', validate(validation.getStudent), queries.getStudent);
router.post('/students', validate(validation.createStudent), queries.createStudent);
router.get('/students/:id', validate(validation.getSingleStudent), queries.getSingleStudent);
router.get('/students/:id/classes', validate(validation.studentWithSemester), queries.studentWithSemester);
router.patch('/students/:id', validate(validation.updateName), queries.updateName);
router.delete('/students/:id', validate(validation.deactivateStudent), queries.deactivateStudent);// TODO - returning 0 rows unnecessary
router.get('/classes', validate(validation.getClasses), queries.getClasses);
router.post('/classes/:id/students', validate(validation.addStudentsToClass), queries.addStudentsToClass);

router.get('/', function (req, res) {
    res.send('Things are working, but please hit a valid API URL.');
});

module.exports = router;