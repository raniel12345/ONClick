import { gql } from "apollo-server-express";
export default gql`
  enum IssueType {
    Bug
    Error
  }

  enum IssueStatus {
    Open
    Closed
  }

  type ProjectIssue {
    id: ID!
    title: String!
    description: String!
    priority: Int!
    issueType: IssueType!
    status: IssueStatus!
    percentCompletion: Int!
    startDate: Date!
    dueDate: Date!
    createdAt: Date!
    updatedAt: Date!
    deletedAt: Date!
  }

  extend type Query {
    projectIssues(projectID: ID!): [ProjectIssue!]
  }

  input ProjectIssueInput {
    projectID: ID!
    title: String!
    description: String!
    priority: Int!
    issueType: IssueType!
    status: IssueStatus!
    percentCompletion: Int!
    startDate: Date!
    dueDate: Date!
  }

  extend type Mutation {
    createProjectIssue(input: ProjectIssueInput!): ProjectIssue!
  }
`;
