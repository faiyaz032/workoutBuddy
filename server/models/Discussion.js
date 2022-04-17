const { Schema, model } = require('mongoose');
const User = require('./User');

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
      date: {
         type: Number,
         required: true,
      },
      user_id: {
         type: String,
         references: {
            model: User,
            key: 'id',
         },
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Discussion = model('Disucssion', DiscussionSchema);

module.exports = Discussion;
