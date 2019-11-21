const projectFeature = (sequelize, DataTypes) => {
  const ProjectFeature = sequelize.define(
    "projectFeature",
    {
      title: {
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
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      percentCompletion: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      dueDate: DataTypes.DATEONLY
    },
    {
      paranoid: true
    }
  );

  ProjectFeature.associate = models => {
    ProjectFeature.belongsTo(models.Project);
  };

  return ProjectFeature;
};

export default projectFeature;
