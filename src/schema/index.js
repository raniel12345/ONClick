import { gql } from "apollo-server-express";
import userSchema from "./user";
import userGroupSchema from "./userGroup";
import projectStatusSchema from "./projectStatus";
import projectSchema from "./project";
import projectFeatureSchema from "./projectFeature";
import projectIssueSchema from "./projectIssue";
import projectMemberSchema from "./projectMember";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  userGroupSchema,
  projectStatusSchema,
  projectSchema,
  projectFeatureSchema,
  projectIssueSchema,
  projectMemberSchema
];
