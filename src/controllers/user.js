import jwt from "jsonwebtoken";
import models from "../models";
import { AuthenticationError, UserInputError } from "apollo-server";

const tokenExpiration = process.env.TOKEN_EXP_TIME || "30m";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, { expiresIn });
};

//
// Get All Users
//
const getAll = async () => {
  return await models.User.findAll({
    include: [models.Project]
  });
};

//
// Get User By id
//
const getById = async userId => {
  return await models.User.findByPk(userId);
};

//
// Create new user
//
const createNew = async ({ username, email, password }, secret) => {
  const user = await models.User.create({ username, email, password });
  return { token: await createToken(user, secret, tokenExpiration) };
};

//
// User Sign in
//
const signIn = async ({ login, password }, secret) => {
  const user = await models.User.findByLogin(login);

  if (!user) {
    throw new UserInputError("No user found with this login credentials.");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    throw new AuthenticationError("Invalid password.");
  }

  return { token: await createToken(user, secret, tokenExpiration) };
};

//
// Delete user by id
//
const deleteById = async id => {
  return await models.User.destroy({ where: { id } });
};

export default {
  getAll,
  getById,
  createNew,
  signIn,
  deleteById
};
