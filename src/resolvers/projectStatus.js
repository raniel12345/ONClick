import ProjectStatus from "../controllers/projectStatus";

export default {
  Query: {
    projectStatuses: async (parent, args, { id }) => {
      return await ProjectStatus.getAll(id);
    }
  },
  Mutation: {
    createProjectStatus: async (parent, args, { me }) => {
      return await ProjectStatus.createNew(args, me);
    }
  }
};
