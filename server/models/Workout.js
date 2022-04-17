const { Schema, model } = require('mongoose');
const Schedule = require('./Schedule');
const User = require('./User');

const WorkoutSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      time: {
         type: String,
         refrence: {
            model: Schedule,
            key: 'dates',
         },
      },
      detail: {
         type: String,
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

const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;
