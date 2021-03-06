import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "./authorization";
import User from "../controllers/user";
import Project from "../controllers/project";

export default {
  Query: {
    users: async () => {
      return await User.getAll();
    },
    user: async (parent, { id }) => {
      return await User.getById(id);
    },
    me: async (parent, args, { me }) => {
      if (!me) {
        return null;
      }
      return await User.getById(me.id);
    }
  },
  Mutation: {
    signUp: async (parent, args, { secret }) => {
      return await User.createNew(args, secret);
    },
    updateUser: async (parent, args, { secret, me }) => {
      return await User.updateUser(args, secret, me);
    },
    signIn: async (parent, args, { secret }) => {
      return await User.signIn(args, secret);
    },
    deleteUser: combineResolvers(isAdmin, async (parent, { id }) => {
      return await User.deleteById(id);
    })
  },
  User: {
    projects: async (user, args, { models }) => {
      return await models.Project.findAll({
        where: {
          userId: user.id
        }
      });
    },
    projectStatuses: async (user, args, { models }) => {
      return await models.ProjectStatus.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
