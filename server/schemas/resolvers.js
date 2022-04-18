const { User } = require('../models');

const resolvers = {
   Query: {
      //Users
      async getAllUsers() {},
      async getUser(_parent, { id }) {},

      //Workouts
      async getAllWorkouts() {},
      async getWorkout(_parent, { id }) {},

      //Schedules
      async getAllSchedules() {},
      async getSchedule(_parent, { id }) {},

      //Discussions
      async getAllDiscussions() {},
      async getDiscussion(_parent, { id }) {},

      //Comments
      async getAllComments() {},
      async getComment(_parent, { id }) {},
   },

   Mutation: {
      //Users
      async createUser(_parent, args) {},
      async login(_parent, { email, password }) {},

      //Workouts
      async createWorkout(_parent, args) {},

      //Schedule
      async createSchedule(_parent, args) {},

      //Discussion
      async createDiscussion(_parent, args) {},

      //Comments
      async createComment(_parent, args) {},
   },
};

module.exports = resolvers;
