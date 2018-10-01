'use strict';

const studentModel = require('../app_model/student');
const ApiError = require('../lib/apiError');

const student = {
    createStudent: function (req, res, next) {
        if (!req.body.name) {
            return next(new ApiError('MIS_BOD'));
        }
        if (!req.body.admissionDate || req.body.admissionDate === '' || req.body.admissionDate === null) {
            return next(new ApiError('MIS_ADMDATE'));
        }
        const data = {
            name: req.body.name,
            admissionDate: req.body.admissionDate
        };
        studentModel.createStudent(data, function (e, r) {
            if (e) {
                return next(e);
            }
            req.sendResult = r;
            next();
        })
    },
    getStudent: function (req, res, next) {
        const data = {};
        if (req.query.pageNo < 0 || req.query.pageNo === 0) {
            return next(new ApiError('INV_PAG'));
        }
        data.pageNo = req.query.pageNo || 1;
        data.pageSize = req.query.perPage || 20;
        if (req.query.classId) {
            data.classId = req.query.classId.toString();
        }
        if (req.query.active && req.query.active === "true") {
            data.is_active = 1;
        }
        if (req.query.admissionYearAfter) {
            data.admissionYearAfter = req.query.admissionYearAfter;
        }
        studentModel.getStudent(data, function (err, resp) {
            if (err) {
                return next(err);
            }
            req.sendResult = resp;
            next();
        });
    },
    updateName: function (req, res, next) {
        if (!req.params.id) {
            return next(new ApiError('MIS_SID'));
        }
        if (!req.body.name) {
            return next(new ApiError('MIS_UNAME'));
        }
        const data = {
            studentId: req.params.id,
            name: req.body.name
        };
        studentModel.updateStudentName(data, function (e, r) {
            if (e) {
                return next(e);
            }
            req.sendResult = r;
            next();
        });
    },
    deactivateStudent: function (req, res, next) {
        if (!req.params.id) {
            return next(new ApiError('MIS_SID'));
        }
        const obj = {
            id: req.params.id,
            name: req.body.name
        };
        studentModel.deactivateStudent(obj, function (e, r) {
            console.log(e || r);
            if (e) {
                return next(e);
            }
            req.sendResult = r;
            next();
        });
    },
    getSingleStudent: function (req, res, next) {
        if (!req.params.id) {
            return next(new ApiError('MIS_SID'));
        }
        const data = {
            id: req.params.id
        };
        studentModel.getStudent(data, function (e, r) {
            if (e) {
                return next(e);
            }
            req.sendResult = r;
            next();
        })

    },
    studentWithSemester: function (req, res, next) {
        if (!req.params.id) {
            return next(new ApiError('MIS_SID'));
        }
        const data = {
            id: req.params.id
        };
        studentModel.getStudentWithSemester(data, function (e, r) {
            if (e) {
                return next(e);
            }
            if (r === "") {
                return next(new ApiError('NO_ST'));
            } else {
                req.sendResult = r;
                next();
            }
        })
    }
};

module.exports = student;