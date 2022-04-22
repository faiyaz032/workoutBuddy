const { gql } = require('apollo-server-express');

const typeDefs = gql`
   #Custom Types
   type User {
      id: ID
      username: String
      name: String
      email: String
      age: Int
   }

   type Workout {
      id: ID
      title: String
      time: String
      details: String
      user: User
   }

   type Schedule {
      id: ID
      content: String
      dates: String
      type: String
      user: User
   }

   # Need to fix the Date in Discussion query.
   type Discussion {
      id: ID
      title: String
      content: String
      user: User
      #createdAt: String
      comments: [Comment]
   }

   type Comment {
      id: ID
      comment_text: String
      user: User
   }

   type Auth {
      token: String
      user: User
   }

   # INPUTS
   input UserInput {
      name: String!
      email: String!
      username: String!
      password: String!
      age: Int!
   }

   input WorkoutInput {
      title: String
      time: String
      details: String
      user: ID
   }

   input ScheduleInput {
      content: String
      dates: String
      type: String
      user: ID
   }

   input DiscussionInput {
      title: String
      content: String
   }

   input CommentInput {
      discussionId: ID!
      comment_text: String
   }

   #Inputs for updates
   input UserUpdateInput {
      name: String
      email: String
      username: String
      age: Int
   }

   #Root Query
   type Query {
      #Queries for User
      getAllUsers: [User]
      getUser(id: ID): User

      #Queries for Workout
      #getAllWorkouts: [Workout]
      #getWorkout(id: ID): Workout

      #Queries for Schedule
      #getAllSchedules: [Schedule]
      #getSchedule(id: ID): Schedule

      #Queries for Discussion
      getAllDiscussions: [Discussion]
      getDiscussion(id: ID): Discussion
      getUserDiscussions: [Discussion]

      #Queries for Comment
   }

   #Root Mutations
   type Mutation {
      #Mutations for User
      createUser(user: UserInput): Auth
      login(email: String!, password: String!): Auth
      updateUser(user: UserUpdateInput): User
      deleteUser: String

      #Mutations for Workout
      #createWorkout(workout: WorkoutInput): Workout

      #Mutations for Schedule
      #createSchedule(schedule: ScheduleInput): Schedule

      #Mutations for Discussion
      createDiscussion(discussion: DiscussionInput): Discussion
      editDiscussion(id: ID, discussion: DiscussionInput): Discussion
      deleteDiscussion(id: ID): String

      #Mutations for Comment
      createComment(comment: CommentInput): Comment
      editComment(id: ID, comment_text: String): Comment
      deleteComment(id: ID): String
   }
`;

module.exports = typeDefs;
