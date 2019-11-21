import { gql } from "apollo-server-express";
export default gql`
  type Token {
    token: String!
  }

  enum UserRole {
    ADMIN
    NORMAL
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRole!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
    isDeleted: Boolean!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      role: UserRole!
    ): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }
`;
