const projectIssue = (sequelize, DataTypes) => {
  const ProjectIssue = sequelize.define(
    "projectIssue",
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
      issueType: {
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

  ProjectIssue.associate = models => {
    ProjectIssue.belongsTo(models.Project);
  };

  return ProjectIssue;
};

export default projectIssue;
