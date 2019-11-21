const perGroupProjectMember = (sequelize, DataTypes) => {
  const PerGroupProjectMember = sequelize.define(
    "perGroupProjectMember",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      paranoid: true
    }
  );

  return PerGroupProjectMember;
};

export default perGroupProjectMember;
