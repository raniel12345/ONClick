import models from "../models";
import { UserInputError, AuthenticationError } from "apollo-server";

const getAll = async () => {
  return await models.Project.findAll({
    include: [models.User]
  });
};

const getById = async projectId => {
  return await models.Project.findByPk(projectId);
};

const createNew = async (projectInput, { id }) => {
  let user = models.User.findByPk(id);

  const {
    title,
    subProject,
    description,
    tags,
    homePage,
    isPublic,
    modules
  } = projectInput;

  return await user
    .then(async user => {
      if (user !== null) {
        var project = await user.createProject(
          {
            title,
            subProject,
            description,
            tags,
            homePage,
            isPublic,
            modules,
            projectStatusId: 1
          },
          {
            include: [models.ProjectStatus]
          }
        );

        return project;
      }

      throw new AuthenticationError("No user found with this token.");
    })
    .catch(err => {
      throw new AuthenticationError(err);
    });
};

export default {
  createNew,
  getAll,
  getById
};
