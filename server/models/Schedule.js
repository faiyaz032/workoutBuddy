const { Schema, model } = require('mongoose');
const User = require('./User');

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
      user_id: {
         type: Number,
         references: {
            model: User,
            key: 'id',
         },
      },
   },
   {
      timestamps: true,
   }
);

const Schedule = model('Schedule', ScheduleScehma);

module.exports = Schedule;
