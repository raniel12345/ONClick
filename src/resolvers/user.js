import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "./authorization";
import User from "../controllers/user";
import models from "../models";

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
    signIn: async (parent, args, { secret }) => {
      return await User.signIn(args, secret);
    },
    deleteUser: combineResolvers(isAdmin, async (parent, { id }) => {
      return await User.deleteById(id);
    })
  }
};
