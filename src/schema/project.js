import { gql } from "apollo-server-express";
export default gql`
  enum Module {
    ISSUE_TRACKING
    WIKI
    TIME_TRACKING
    FORUMS
    NEWS
    CALENDAR
    DOCUMENTS
    GANTT
    FILESS
  }

  type Project {
    _id: ID!
    title: String!
    subProject: Project
    description: String!
    tags: [String!]!
    isPublic: Boolean!
    owner: User!
    modules: [Module!]!
    status: ProjectStatus!
    members: ProjectMember
    issues: [ProjectIssue!]
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    projects: [Project!]
    project(id: ID!): Project!
  }

  input ProjectInput {
    title: String!
    subProject: String
    description: String!
    tags: [String!]!
    homePage: String!
    public: Boolean!
    modules: [Module!]!
  }

  extend type Mutation {
    createProject(projectInput: ProjectInput): Project!
  }
`;
