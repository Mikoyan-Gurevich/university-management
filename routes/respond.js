'use strict';

module.exports = function respondfn(req, res, next) {
  if ((req.url & req.url.indexOf('jsonp') > -1) ||
    (req.query && (req.query.callback || req.query.CALLBACK))) {
    res.status(201).jsonp(req.sendResult);
  } else {
    res.status(201).json(req.sendResult);
  }

};

if (require.main === module) {
  (function () {
    const req = {
      sendResult: {
        result: 'Ok',
        data: 'test respond data'
      },
      url: 'testing',
      query: {
        CALLBACK: 'Testing'
      }
    };
    const res = {
      json: console.log,
      jsonp: function (data) {
        console.log('jsonp', data);
      }
    };
    module.exports(req, res);
  })();
}
