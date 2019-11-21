import Sequelize from "sequelize";

export const batchStatus = async (keys, models) => {
  const statuses = await models.ProjectStatus.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: keys
      }
    }
  });

  return keys.map(key => statuses.find(status => status.id === key));
};
