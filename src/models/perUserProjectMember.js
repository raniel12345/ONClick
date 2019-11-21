const perUserProjectMember = (sequelize, DataTypes) => {
  const PerUserProjectMember = sequelize.define(
    "perUserProjectMember",
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
  return PerUserProjectMember;
};

export default perUserProjectMember;
