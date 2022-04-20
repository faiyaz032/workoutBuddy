const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail, isStrongPassword } = require('validator').default;
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
         validate: [isEmail, 'Invalid email format!'],
      },
      password: {
         type: String,
         required: true,
         //Todo: Need to uncomment this validation later
         // validate: [
         //    isStrongPassword,
         //    'Password must have 8 charachters, 1 lowercase, 1 uppercase, 1 number and 1 symbol',
         // ],
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

//Hash the password
UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
   } catch (error) {
      return next(error);
   }
});

UserSchema.methods = {
   //helper function for validate the password
   async validatePassword(password) {
      return bcrypt.compare(password, this.password);
   },
};

const User = model('User', UserSchema);

module.exports = User;
