const db = require('pg-promise')({ promiseLib: require('bluebird') })('postgres://localhost:5432/university');

async function getStudent(req, res, next) {
    try {
        const data = await db.any('select * from student');
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL students'
        });
    } catch (err) {
        return next(err);
    }
}

async function getSingleStudent(req, res, next) {
    const studentID = parseInt(req.params.id);
    try {
        const data = await db.one('select * from student where roll_no = $1', studentID);
        res.status(200).json({
            status: 'success',
            data: data,
            message: `Retrieved data for student with ID ${studentID}`
        });
    } catch (err) {
        return next(err);
    }
}

async function createStudent(req, res, next) {
    try {
        await db.none('insert into student(name, admission_date) values(${name}, ${admissionDate})', req.body);
        res.status(200).json({
            status: 'success',
            message: 'Inserted one student'
        });
    } catch (err) {
        return next(err);
    }
}

async function studentWithSemester(req, res, next) {
    const studentID = parseInt(req.params.id);
    try {
        const data = await db.one('select student.name as student_name, professor.name as professor_name, semester_class.title as sem_class from professor INNER JOIN student ON professor.sem_class_id = student.sem_class_id INNER JOIN semester_class ON student.sem_class_id=semester_class.id where student.roll_no = $1', studentID);
        res.status(200).json({
            status: 'success',
            data: data,
            message: `Retrieved classes for student with ID ${studentID}`
        });
    } catch (err) {
        return next(err);
    }
}

async function updateName(req, res, next) {
    const studentID = parseInt(req.params.id);
    try {
        await db.one('update student set name = $1 where roll_no = $2', [req.body.name, studentID]);
        res.status(200).json({
            status: 'success',
            message: `Successfully updated name for student with roll no ${studentID}`
        });
    } catch (err) {
        return next(err);
    }
}


async function deactivateStudent(req, res, next) {
    const studentID = parseInt(req.params.id);
    try {
        await db.one('update student set is_active = $1 where roll_no = $2', [0, studentID]);
        res.status(200).json({
            status: 'success',
            message: `Successfully marked student with roll no ${studentID} as inactive`
        });
    } catch (err) {
        return next(err);
    }
}

async function getClasses(req, res, next) {
    try {
        const data = await db.any('select * from semester_class');
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved all classes'
        });
    } catch (err) {
        return next(err);
    }
}

async function addStudentsToClass(req, res, next) {
    const classesID = parseInt(req.params.id);
    const students = req.query.student.map((studentID) => { return parseInt(studentID) });
    try {
        await db.any('update student set sem_class_id = $1 where roll_no in ($2:csv)', [classesID, students]);
        res.status(200).json({
            status: 'success',
            message: `Classes mapped successfully`
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getStudent: getStudent,
    getSingleStudent: getSingleStudent,
    createStudent: createStudent,
    studentWithSemester: studentWithSemester,
    updateName: updateName,
    deactivateStudent: deactivateStudent,
    getClasses: getClasses,
    addStudentsToClass: addStudentsToClass
};