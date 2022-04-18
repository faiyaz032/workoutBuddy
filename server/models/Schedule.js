const { Types, Schema, model } = require('mongoose');

const ScheduleScehma = new Schema(
   {
      content: {
         type: String,
         required: true,
      },
      dates: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         required: true,
      },
      user: {
         type: Types.ObjectId,
         ref: 'User',
      },
   },
   {
      timestamps: true,
   }
);

const Schedule = model('Schedule', ScheduleScehma);

module.exports = Schedule;
