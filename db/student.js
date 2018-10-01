const db = require('./index.js');

const student = {
    addNewStudent: function (data, cb) {
        db.connect(function (err, client) {
            if (err) {
                cb(err);
            }
            const dataQuery = `insert into student (name,   admission_date ) values ('${data.name}', '${data.admissionDate}');`;
            client.query(dataQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    // TODO - do we need to hanlde scenario for count < 1
                    if (result.rowCount >= 1) {
                        cb(null, result.rowCount);
                    }
                }
            });
        });
    },
    getStudent: function (data, cb) {
        // TODO - Admission year handling not done.
        db.connect(function (err, client) {
            if (err) {
                cb(err);
            }
            let dataQuery;
            if (data.id) {
                dataQuery = `SELECT * from student where roll_no = ${data.id}`;
            } else if (data.classId) {
                if (data.classId.length === 1) {
                    dataQuery = `SELECT * from student where sem_class_id = ('${data.classId}')`;
                } else if (data.classId.length > 1 && data.is_active === 1) {
                    dataQuery = `SELECT * from student where sem_class_id IN (${data.classId}) and is_active = 1 LIMIT (${data.pageSize}) OFFSET (${data.pageNo}) `;
                } else if (data.classId.length > 1 && data.is_active === 1 && admission_date) {
                    dataQuery = `SELECT * from student where sem_class_id IN (${data.classId}) and is_active = 1 AND admission_date >= ('${data.admissionYearAfter + "-01-01"}') LIMIT (${data.pageSize}) OFFSET (${data.pageNo})  `;
                }
            } else {
                dataQuery = `SELECT * from student`;
            }
            client.query(dataQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    cb(null, result.rows);
                }
            });
        });
    },
    updateStudentName: function (data, cb) {
        db.connect(function (err, client) {
            if (err) {
                cb(err);
            }
            const dataQuery = `update student SET NAME = ('${data.name}') WHERE roll_no=(Select roll_no from student where roll_no = '${data.studentId}')`;
            client.query(dataQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    cb(null, result.rowCount);
                }
            });
        });
    },
    deactivateStudent: function (data, cb) {
        db.connect(function (err, client) {
            if (err) {
                cb(err);
            }
            const dataQuery = `update student SET is_active = 0 WHERE roll_no = (Select roll_no from student where roll_no = '${data.id}')`;
            client.query(dataQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    cb(null, result.rowCount);
                }
            });
        });
    },
    getStudentWithSemester: function (data, cb) {
        db.connect(function (err, client, done) {
            if (err) {
                cb(err);
            }
            const ageQuery = `select student.name as student_name, professor.name as professor_name, semester_class.title as sem_class from professor INNER JOIN student ON professor.sem_class_id = student.sem_class_id INNER JOIN semester_class ON student.sem_class_id=semester_class.id where student.roll_no='${data.id}';`;
            client.query(ageQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    cb(null, result.rows);
                }
            });
        });
    }
};

module.exports = student;