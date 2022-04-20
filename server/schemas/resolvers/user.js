const User = require('../../models/User');
const { ApolloError, AuthenticationError } = require('apollo-server-errors');
const { signToken } = require('../../utils/signToken');

module.exports = {
   Query: {
      async getAllUsers() {
         try {
            return await User.find({});
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async getUser(_parent, { id }) {
         try {
            const user = await User.findById(id);
            if (!user) throw new ApolloError('Failed to find any user with provided user ID');
            return user;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },
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
            const token = signToken(user._id, user.email);

            return { token, user };
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async login(_parent, { email, password }) {
         try {
            const user = await User.findOne({ email });
            if (!user) throw new ApolloError('Failed to find any user with this email');

            const isValidPassword = await user.validatePassword(password);

            if (!isValidPassword) throw new ApolloError('Incorrect Password! Please enter the correct password.');

            return { token: signToken(user._id, email), user };
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async updateUser(_parent, args, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const user = await User.findByIdAndUpdate(
               userId,
               {
                  ...args.user,
               },
               { new: true }
            );

            return user;
         } catch (error) {
            throw new ApolloError(error);
         }
      },

      async deleteUser(_parent, _args, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return `User deleted successfully. Deleted user's ID: ${deletedUser._id}`;
         } catch (error) {
            throw new ApolloError(error);
         }
      },
   },
};
