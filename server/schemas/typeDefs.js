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

  type Query {
    user: [User],
    discussion: [Discussion]
  }
`;

module.exports = typeDefs;
