const { ApolloError, AuthenticationError } = require('apollo-server-errors');
const { Discussion } = require('../../models/index');

module.exports = {
   //Query for Discussion
   Query: {
      async getAllDiscussions() {
         try {
            return await Discussion.find({});
         } catch (error) {
            throw new ApolloError(error);
         }
      },

      async getDiscussion(_parent, { id }) {
         try {
            const discussion = await Discussion.findById(id)
               .populate('user', '_id username name email')
               .populate({
                  path: 'comments',
                  populate: {
                     path: 'user',
                     model: 'User',
                  },
               });

            if (!discussion) throw new ApolloError('Failed to find any discussion with the provided ID');

            return discussion;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async getUserDiscussions(_parent, _args, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const discussions = await Discussion.find({ user: userId });
            return discussions;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },
   },

   //Mutations for Discussion
   Mutation: {
      async createDiscussion(_parent, args, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');
         try {
            const discussion = await Discussion.create({
               ...args.discussion,
               user: userId,
            });

            if (!discussion) throw new ApolloError('Error while creating discussion.');

            return discussion;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async editDiscussion(_parent, { id, discussion }, { isAuth }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const updatedDiscussion = await Discussion.findByIdAndUpdate(
               id,
               {
                  ...discussion,
               },
               { new: true }
            );

            if (!updatedDiscussion) throw new ApolloError('Failed to find any discussion with the provided ID');

            return updatedDiscussion;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async deleteDiscussion(_parent, { id }, { isAuth }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const deletedDiscussion = await Discussion.findByIdAndDelete(id);
            return `Discussion deleted successfully. Deleted user's ID: ${deletedDiscussion._id}`;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },
   },
};
