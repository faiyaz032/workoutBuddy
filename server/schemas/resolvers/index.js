const userResolvers = require('./user');
const resolvers = {
   Query: {
      //Users
      ...userResolvers.Query,

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
      ...userResolvers.Mutation,

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
