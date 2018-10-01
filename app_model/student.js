'use strict';
const studentDB = require('../db/student');

const student = {
    createStudent: function (data, cb) {
        studentDB.addNewStudent(data, function (e, r) {
            if (e) {
                return cb(e);
            }
            cb(null, "Successfully created");
        });
    },
    getStudent: function (data, cb) {
        studentDB.getStudent(data, function (e, r) {
            if (e) {
                return cb(e);
            }
            cb(null, r);
        });
    },
    updateStudentName: function (data, cb) {
        studentDB.updateStudentName(data, function (e, r) {
            if (e) {
                return cb(e);
            }
            else if (r === 1) {
                cb(null, "Successfully updated for student id:" + data.studentId + " with name: " + data.name);
            } else if (r === 0) {
                cb(null, "Can not find student with id: " + data.studentId);
            }
        });
    },
    deactivateStudent: function (data, cb) {
        studentDB.deactivateStudent(data, function (e, r) {
            if (e) {
                return cb(e);
            }
            if (r === 1) {
                cb(null, "Successfully deactivated for student id:" + data.id);
            } else if (r === 0) {
                cb(null, "Can not find student with id: " + data.id);
            }
        });
    },
    getStudentWithSemester: function (data, cb) {
        studentDB.getStudentWithSemester(data, function (e, r) {
            if (e) {
                return cb(e);
            } else if (r.length === 1) {
                cb(null, r);
            } else if (r.length === 0) {
                return cb(null, "");
            }

        });
    }
};

module.exports = student;