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
      }
    },
    {
      paranoid: true
    }
  );

  ProjectStatus.associate = models => {
    ProjectStatus.belongsTo(models.User);
    ProjectStatus.hasMany(models.Project);
  };

  return ProjectStatus;
};

export default projectStatus;
