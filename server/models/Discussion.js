const { Types, Schema, model } = require('mongoose');

const DiscussionSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },

      content: {
         type: String,
         required: true,
      },

      user: {
         type: Types.ObjectId,
         ref: 'User',
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Discussion = model('Disucssion', DiscussionSchema);

module.exports = Discussion;
