const { Types, Schema, model } = require('mongoose');

const commentSchema = new Schema(
   {
      comment_text: {
         type: String,
         required: true,
      },
      user: {
         type: Types.ObjectId,
         required: true,
         ref: 'User',
      },
   },
   {
      timestamps: true,
   }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
