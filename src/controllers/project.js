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
  const {
    title,
    subProject,
    description,
    tags,
    homePage,
    isPublic,
    modules
  } = projectInput;

  return await models.User.findByPk(id)
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

const deleteById = async (projectId, { id }) => {
  let currentUser = models.User.findByPk(id);
  let userProject = models.Project.findByPk(projectId);

  return await currentUser.then(async user => {
    if (user !== null) {
      return await userProject.then(async project => {
        if (project !== null) {
          if (user.id === project.userId) {
            return await project
              .destroy()
              .then(result => {
                // console.log(result);
                return true;
              })
              .catch(err => {
                // console.log(err);
                return false;
              });
          } else {
            throw new UserInputError("Permission denied.");
          }
        } else {
          throw new UserInputError("Project not found");
        }
      });
    } else {
      throw new AuthenticationError("No user found with this token.");
    }
  });
};

export default {
  createNew,
  getAll,
  getById,
  deleteById
};
