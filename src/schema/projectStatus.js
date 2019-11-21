import { gql } from "apollo-server-express";
export default gql`
  type ProjectStatus {
    id: ID!
    status: String!
    description: String!
    isDeleted: Boolean!
  }

  extend type Query {
    projectStatuses: [ProjectStatus!]!
  }

  extend type Mutation {
    createProjectStatus(
      projectID: ID!
      status: String!
      description: String!
    ): ProjectStatus!
  }
`;
