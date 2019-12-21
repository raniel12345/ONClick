// import { combineResolvers } from "graphql-resolvers";
// import { isAdmin } from "./authorization";
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
    createProject: async (parent, { projectInput }, { me }) => {
      //console.log(projectInput);
      return await Project.createNew(projectInput, me);
    },
    deleteProject: async (parent, { id }, { me }) => {
      return await Project.deleteById(id, me);
    }
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
