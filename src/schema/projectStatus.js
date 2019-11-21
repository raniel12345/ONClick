import { gql } from "apollo-server-express";
export default gql`
  type ProjectStatus {
    id: ID!
    status: String!
    description: String!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
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
