const { Schema, model } = require('mongoose');

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
         type: Number,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      age: {
         type: int,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const User = model('User', UserSchema);

module.exports = User;
