const group = (sequelize, DataTypes) => {
  const Group = sequelize.define("group", {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Group.associate = models => {
    Group.belongsToMany(models.User, {
      through: models.GroupUsers,
      as: "users",
      foreignKey: "groupId"
    });
  };

  return Group;
};

export default group;
