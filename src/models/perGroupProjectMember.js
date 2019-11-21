const perGroupProjectMember = (sequelize, DataTypes) => {
  const PerGroupProjectMember = sequelize.define("perGroupProjectMember", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return PerGroupProjectMember;
};

export default perGroupProjectMember;
