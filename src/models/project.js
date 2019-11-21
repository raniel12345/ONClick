const project = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      subProject: {
        type: DataTypes.UUID
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      modules: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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

  Project.associate = models => {
    Project.belongsTo(models.User);
    Project.hasMany(models.ProjectFeature);
    Project.hasMany(models.ProjectIssue);
    Project.belongsToMany(models.User, {
      through: models.PerUserProjectMember,
      foreignKey: "projectId"
    });
    Project.belongsToMany(models.GroupUsers, {
      through: models.PerGroupProjectMember,
      foreignKey: "projectId"
    });
  };

  Project.beforeDestroy(async project => {
    await project.update({ isDeleted: 1 });
  });

  return Project;
};

export default project;
