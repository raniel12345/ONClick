const projectStatus = (sequelize, DataTypes) => {
  const ProjectStatus = sequelize.define(
    "projectStatus",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      paranoid: true
    }
  );

  ProjectStatus.associate = models => {
    ProjectStatus.hasOne(models.Project, { as: "Status" });
  };

  return ProjectStatus;
};

export default projectStatus;