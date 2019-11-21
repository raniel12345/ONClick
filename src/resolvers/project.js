import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "./authorization";
import Project from "../controllers/project";

export default {
  Query: {
    projects: async () => {
      return await Project.getAll();
    },
    project: async (parent, { id }) => {
      return await Project.getById(id);
    }
  },
  Mutation: {
    createProject: combineResolvers(
      isAdmin,
      async (parent, { projectInput }, { me }) => {
        console.log(projectInput);
        return await Project.createNew(projectInput, me);
      }
    )
  },
  Project: {
    owner: async (project, args, { loaders }) => {
      return await loaders.user.load(project.userId);
    },
    status: async (project, args, { loaders }) => {
      return await loaders.projectStatus.load(project.projectStatusId);
    }
  }
};
