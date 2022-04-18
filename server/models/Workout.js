const { Types, Schema, model } = require('mongoose');

const WorkoutSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      time: {
         type: String,
         required: true,
      },
      details: {
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

const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;
