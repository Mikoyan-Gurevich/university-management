'use strict';

const map = {

  httpMap: {
    400: "Bad Request",
    401: "Login required",
    403: "Forbidden",
    404: "Not Found",
    406: "Validation Error",
    412: "Precondition Failed",
    422: "Unprocessable Entity",
    500: "Unknown Error",
  },

  codeMap: {
    'MIS_BOD': {
      message: "Missing required params: name",
      title: "Missing required params: name",
      status: 400
    },
    'MIS_SID': {
      message: "Missing required qparams: Student id",
      title: "Missing required qparams: Student id",
      status: 400
    },
    'MIS_UNAME': {
      message: "Missing required data: name",
      title: "Missing required data: name",
      status: 400
    },
    'MIS_CLID': {
      message: "Missing classId",
      title: "Missing classId",
      status: 400
    },
    'INV_PAG': {
      message: "Invalid page number, should start with 1",
      title: "Invalid page number, should start with 1",
      status: 400
    },
    'MIS_ADMDATE': {
      message: "Missing admission date in request body",
      title: "Missing admission date in request body",
      status: 400
    },
    'NO_ST': {
      message: "No such student",
      title: "No such student",
      status: 404
    }

  }
};

module.exports = map;
