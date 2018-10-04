const db = require('pg-promise')({ promiseLib: require('bluebird') })('postgres://postgres:my_postgres_password@localhost:5432/university');

async function getStudent(req, res, next) {
    const classes = req.query.classes && req.query.classes.length > 0 && req.query.classes.map((classID) => { return parseInt(classID) });
    const active = req.query.active === 'true' ? [1] : req.query.active === 'false' ? [0] : [0, 1];
    const admissionYearAfter = req.query.admissionYearAfter ? req.query.admissionYearAfter + '-01-01' : null;
    const admissionYearBefore = req.query.admissionYearBefore ? req.query.admissionYearBefore + '-01-01' : null;
    const pageSize = req.query.pageSize || 20;
    const pageNumber = req.query.pageNumber || 1;
    try {
        const data = await db.any(`select * from student where is_active in ($1:csv) ${classes ? 'and roll_no in (select student_roll_no from class_mapping where semester_class_id in ($2:csv))' : ''} ${admissionYearAfter ? 'and admission_date >= $3::date' : ''} ${admissionYearBefore ? 'and admission_date < $4::date' : ''} ${classes ? 'and roll_no in (1,2,3)' : ''} limit $5 offset $6`, [active, classes, admissionYearAfter, admissionYearBefore, pageSize, pageSize * (pageNumber - 1)]);
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
        const data = await db.any('select sc.title, p.name from student as s inner join class_mapping as c on s.roll_no = c.student_roll_no inner join semester_class as sc on sc.id = c.semester_class_id inner join professor as p on p.sem_class_id = sc.id where s.roll_no = $1', studentID);
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
    const list = req.query.student instanceof Array
        ? req.query.student.map((studentID) => { return { studentID: parseInt(studentID), classID: parseInt(req.params.id) } })
        : [{ studentID: parseInt(req.query.student), classID: parseInt(req.params.id) }];
    try {
        await db.tx(transaction => {
            const queries = list.map(item => {
                return transaction.none('insert into class_mapping(student_roll_no, semester_class_id) VALUES(${studentID}, ${classID})', item);
            });
            return transaction.batch(queries);
        })
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