const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const { sign } = require('jsonwebtoken');

module.exports = {
   Query: {
      async getAllUsers() {
         try {
            return await User.find({});
         } catch (error) {
            throw new ApolloError(error);
         }
      },

      async getUser(_parent, { id }) {},
   },

   Mutation: {
      async createUser(_parent, args) {
         const { name, email, username, password, age } = args.user;
         try {
            //check if user already exists with the email
            const oldUser = await User.findOne({ email });
            if (oldUser) throw new ApolloError('User already exists with this email');

            //create user
            const user = await User.create({ name, email: email.toLowerCase(), username, password, age });

            //sign token
            const token = sign(
               {
                  id: user._id,
                  email,
               },
               'UNSAFE_TOKEN',
               {
                  expiresIn: '3h',
               }
            );

            return { token, user };
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },
      async login(_parent, { email, password }) {},
   },
};
