const groupUsers = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define(
    "groupUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id"
        }
      }
    },
    {
      paranoid: true
    }
  );

  GroupUser.associate = models => {
    GroupUser.belongsToMany(models.Project, {
      through: models.PerGroupProjectMember,
      foreignKey: "groupUserId"
    });
  };

  return GroupUser;
};

export default groupUsers;
