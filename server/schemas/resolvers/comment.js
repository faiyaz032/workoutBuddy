const { Discussion, Comment } = require('../../models/index');
const { ApolloError, AuthenticationError } = require('apollo-server-errors');
module.exports = {
   //Queries for Comment
   Query: {},

   //Mutations for Comment
   Mutation: {
      async createComment(_parent, { comment }, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');
         try {
            const newComment = await Comment.create({
               comment_text: comment.comment_text,
               user: userId,
            });

            if (!newComment) throw new ApolloError('There was error while creating the comment');

            //push the comment id on discussions collection
            await Discussion.findByIdAndUpdate(comment.discussionId, {
               $push: { comments: newComment._id },
            });

            return newComment;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async editComment(_parent, { id, comment_text }, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const { user } = await Comment.findById(id);

            if (user.toString() !== userId)
               throw new AuthenticationError('You are not authorized to edit or delete this comment');

            const comment = await Comment.findByIdAndUpdate(
               id,
               {
                  comment_text,
               },
               {
                  new: true,
               }
            );

            return comment;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },

      async deleteComment(_parent, { id }, { isAuth, userId }) {
         if (!isAuth) throw new AuthenticationError('You are not authenticated!');

         try {
            const { user } = await Comment.findById(id);

            if (user.toString() !== userId)
               throw new AuthenticationError('You are not authorized to edit or delete this comment');

            const deletedComment = await Comment.findByIdAndDelete(id);

            return `Comment deleted successfully. Deleted comment ID: ${deletedComment._id}`;
         } catch (error) {
            console.log(error);
            throw new ApolloError(error);
         }
      },
   },
};
