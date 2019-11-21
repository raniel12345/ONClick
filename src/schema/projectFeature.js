import { gql } from "apollo-server-express";
export default gql`
  enum FeatureStatus {
    Open
    Closed
  }

  type ProjectFeature {
    id: ID!
    title: String!
    description: String!
    priority: Int!
    status: FeatureStatus!
    percentCompletion: Int!
    startDate: Date!
    dueDate: Date!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
  }

  extend type Query {
    projectFeatures(projectID: ID!): [ProjectFeature]
  }

  input ProjectFeatureInput {
    projectID: ID!
    title: String!
    description: String!
    priority: Int!
    status: FeatureStatus!
    percentCompletion: Int!
    startDate: Date!
    dueDate: Date!
  }

  extend type Mutation {
    createProjectFeature(input: ProjectFeatureInput!): ProjectFeature
  }
`;
