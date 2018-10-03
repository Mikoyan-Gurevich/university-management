const Joi = require('joi');

const plainIntegers = Joi.number().integer();
const nameValidation = Joi.string().regex(/^[a-zA-Z 0-9-]+$/);
const plainIntegersArray = Joi.array().items(plainIntegers);
const dateFormat = Joi.string().regex(/^[0-9-]+$/);

module.exports = {
    getStudent: {
        query: {
            // TODO - fix below
            //classes: plainIntegersArray,
            active: Joi.any().valid('true', 'false'),
            admissionYearAfter: plainIntegers,
            admissionYearBefore: plainIntegers,
            pageSize: plainIntegers,
            pageNumber: plainIntegers
        }
    },
    getSingleStudent: {
        param: {
            id: plainIntegers
        }
    },
    createStudent: {
        body: {
            name: nameValidation,
            admissionDate: dateFormat
        }
    },
    studentWithSemester: {
        param: {
            id: plainIntegers
        }
    },
    updateName: {
        param: {
            id: plainIntegers
        },
        body: {
            name: nameValidation
        }
    },
    deactivateStudent: {
        param: {
            id: plainIntegers
        }
    },
    getClasses: {},
    addStudentsToClass: {
        param: {
            id: plainIntegers
        },
        query: {
            // student: plainIntegersArray
        }
    }
};