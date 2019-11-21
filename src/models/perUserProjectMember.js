const perUserProjectMember = (sequelize, DataTypes) => {
  const PerUserProjectMember = sequelize.define("perUserProjectMember", {
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
  return PerUserProjectMember;
};

export default perUserProjectMember;
