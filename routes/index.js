const express = require('express');
const queries = require('../queries');

const router = express.Router();

router.get('/students', queries.getStudent); // TODO - radd query params support
router.post('/students', queries.createStudent);
router.get('/students/:id', queries.getSingleStudent);
router.get('/students/:id/classes', queries.studentWithSemester);
router.patch('/students/:id', queries.updateName);
router.delete('/students/:id', queries.deactivateStudent);// TODO - returning 0 rows unnecessary
router.get('/classes', queries.getClasses);
router.post('/classes/:id/students', queries.addStudentsToClass);

router.get('/', function (req, res) {
    res.send('Things are working, but please hit a valid API URL.');
});

module.exports = router;