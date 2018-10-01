const db = require('./index.js');

const student = {
    getClasses: function (data, cb) {
        db.connect(function (err, client) {
            if (err) {
                cb(err);
            }
            const dataQuery = 'SELECT * from semester_class';
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
    addStudentsToClass: function (data, cb) {
        db.connect(function (err, client, done) {
            if (err) {
                cb(err);
            }
            var ageQuery = "";
            if (data.studentId.length === 1) {
                ageQuery = `UPDATE student set sem_class_id=('${data.classId}') where roll_no=( Select roll_no from student where roll_no = '${data.studentId}')`;
            } else if (data.studentId.length > 1) {
                var qData = data.studentId.toString();
                ageQuery = ` UPDATE student set sem_class_id=('${data.classId}') where roll_no IN (${qData});`
            } else if (ageQuery === "") {
                return cb(null);
            }
            client.query(ageQuery, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    cb(null, result.rowCount);
                }
            });
        });
    }
};

module.exports = student;