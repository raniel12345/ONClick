import { gql } from "apollo-server-express";
export default gql`
  type UserGroup {
    id: ID!
    title: String!
    description: String!
    members: [User!]
    isDeleted: Boolean!
  }

  extend type Query {
    userGroups: [UserGroup!]
  }

  input UserGroupInput {
    title: String!
    description: String!
  }

  extend type Mutation {
    createUserGroup(input: UserGroupInput): UserGroup!
  }
`;
