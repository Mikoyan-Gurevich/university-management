'use strict';

const classModel = require('../app_model/classes');
const ApiError = require('../lib/apiError');

const student = {
    addStudentsToClass: function (req, res, next) {
        const data = {};
        if (!req.params.id) {
            return next(new ApiError('MIS_CLID'));
        }
        data.classId = req.params.id;
        if (req.query.studentId) {
            data.studentId = req.query.studentId;
        }
        classModel.addStudentsToClass(data, function (e, r) {
            if (e) {
                return next(e);
            }
            req.sendResult = r;
            next();
        })
    },
    getClasses: function (req, res, next) {
        classModel.getClasses({}, function (err, resp) {
            if (err) {
                return next(err);
            }
            req.sendResult = resp;
            next();
        });
    }
};

module.exports = student;