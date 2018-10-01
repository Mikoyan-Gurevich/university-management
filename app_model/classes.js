'use strict';

const classesDB = require('../db/classes');

const classes = {
    addStudentsToClass: function (data, cb) {
        classesDB.addStudentsToClass(data, function (e, r) {
            if (e) {
                return cb(e);
            }
            cb(null, "Successfully added " + r + " students to class");
        });
    },
    getClasses: function (data, cb) {
        classesDB.getClasses({}, function (e, r) {
            if (e) {
                return cb(e);
            }
            cb(null, r);
        });
    }
};

module.exports = classes;