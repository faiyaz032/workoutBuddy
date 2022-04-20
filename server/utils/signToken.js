const { sign } = require('jsonwebtoken');

exports.signToken = function (id, email) {
   //TODO: We need to change the UNSAFEKEY to some secure jwt secret key
   return sign({ id, email }, 'UNSAFEKEY', { expiresIn: '4h' });
};
