import { gql } from "apollo-server-express";
export default gql`
  enum ProjectRoles {
    Developer
    Reporter
    Observer
  }

  type UserMember {
    users: User!
    role: ProjectRoles!
  }

  type GroupMember {
    group: UserGroup!
    role: ProjectRoles!
  }

  type Members {
    user: [UserMember!]
    groups: [GroupMember!]
  }

  type ProjectMember {
    id: ID!
    project: Project
    members: Members!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    ProjectMembers(projectID: ID!): ProjectMember!
  }

  enum memberType {
    User
    Group
  }

  input ProjectMemberInput {
    projectID: ID!
    memberType: memberType!
    memberID: ID!
  }

  extend type Mutation {
    addProjectMember(input: ProjectMemberInput): Members!
  }
`;
