const { Schema, model } = require('mongoose');
const Discussion = require('./Discussion');
const User = require('./User');

const commentSchema = new Schema(
   {
      comment_text: {
         type: String,
         required: true,
      },
      user_id: {
         type: String,
         required: true,
         references: {
            model: User,
            key: 'id',
         },
      },
      discussion_id: {
         type: String,
         required: true,
         references: {
            model: Discussion,
            key: 'id',
         },
      },
   },
   {
      timestamps: true,
   }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
