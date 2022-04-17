const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      age: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const User = model('User', UserSchema);

module.exports = User;
