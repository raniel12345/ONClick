import models from "../models";

const getAll = async userId => {
  return await models.ProjectStatus.findAll({
    where: {
      userId: userId
    }
  });
};

const createNew = async ({ status, description }, { id }) => {
  let user = await models.User.findOne({
    where: { id: id }
  });

  await user.createProjectStatus({
    status,
    description
  });

  return status;
};

export default {
  getAll,
  createNew
};
