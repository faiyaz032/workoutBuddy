const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    age: Number
  }

  type Discussion{
    _id: ID
    title: String
    date: String
    user_id: refrence{
      model: User,
      key: 'id'
    }
  }

  type Workout {
    _id: ID
    title: String
    time: String
    type: refrence{
      model: Schedule,
      key: 'dates'
    }
    detail: String
    user_id: refrence{
      model: User,
      key: 'id'
    }
  }

  type Schedule {
    _id: ID
    content: String
    dates: String
    type: String
    user_id: refrence{
      model: User,
      key: 'id'
    }
  }

  type Comment {
    _id: ID
    comment_text: String
    user_id: refrence{
      model: User,
      key: 'id'
    }
    discussion_id: refrence{
      model: Discussion,
      key: 'id'
    }
  }

  type Query {
    user: [User],
    discussion: [Discussion],
    schedule: [Schedule],
    workout: [Workout],
    comment: [Comment]
  }
`;

module.exports = typeDefs;
