const { AuthenticationError } = require('apollo-server');
const { verify } = require('jsonwebtoken');

exports.isAuth = ({ req }) => {
   let user = {
      isAuth: false,
   };

   const authHeader = req.headers.authorization;
   if (!authHeader) return user;

   const token = authHeader.split(' ')[1];
   if (!token) return user;

   try {
      //TODO: need to change the jwt secret later
      const decoded = verify(token, 'UNSAFEKEY');
      if (decoded) {
         user.isAuth = true;
         user.userId = decoded.id;
         user.userEmail = decoded.email;
         return user;
      }

      return user;
   } catch (error) {
      throw new AuthenticationError('Invalid/Expired token');
   }
};
